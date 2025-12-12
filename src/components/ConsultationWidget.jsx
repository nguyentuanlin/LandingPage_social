import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaComments, FaTimes } from 'react-icons/fa'
import { io } from 'socket.io-client'

const API_BASE = import.meta.env.VITE_CRM_API_URL || 'http://localhost:7000'
const WS_BASE = import.meta.env.VITE_CRM_WS_URL || API_BASE
const VISITOR_ID_KEY = 'web_chat_visitor_id_v1'
const CONVERSATION_ID_KEY = 'web_chat_conversation_id_v1'

const ConsultationWidget = ({ theme = 'dark' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [visitorId, setVisitorId] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [initializing, setInitializing] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState({ fullName: '', phone: '', email: '', address: '' })
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [showProfileForm, setShowProfileForm] = useState(true)
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const normalizeMessage = (m) => {
    if (!m) return null
    return {
      id: m.id || `${m.senderType || 'unknown'}-${m.createdAt || m.sentAt || Math.random()}`,
      content: m.content || '',
      senderType: m.senderType || 'customer',
      createdAt: m.createdAt || m.sentAt || new Date().toISOString(),
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      let id = window.localStorage.getItem(VISITOR_ID_KEY)
      if (!id) {
        id = `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        window.localStorage.setItem(VISITOR_ID_KEY, id)
      }
      setVisitorId(id)
      const existingConversationId = window.localStorage.getItem(CONVERSATION_ID_KEY)
      if (existingConversationId) {
        setConversationId(existingConversationId)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (!visitorId || !isOpen) return
    let cancelled = false

    const init = async () => {
      setInitializing(true)
      setError('')
      try {
        const base = (API_BASE || '').replace(/\/+$/, '')
        let convId = conversationId
        if (!convId) {
          const res = await fetch(`${base}/web-chat/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visitorId }),
          })
          if (!res.ok) {
            throw new Error('Không khởi tạo được cuộc trò chuyện. Vui lòng thử lại.')
          }
          const data = await res.json()
          convId = data.id || data.conversationId
          if (!convId) {
            throw new Error('Phản hồi không hợp lệ từ máy chủ.')
          }
          if (!cancelled) {
            setConversationId(convId)
            try {
              window.localStorage.setItem(CONVERSATION_ID_KEY, convId)
            } catch (e) {
              // ignore
            }

            const msgs = Array.isArray(data.messages) ? data.messages.map(normalizeMessage).filter(Boolean) : []
            if (!cancelled) {
              setMessages(msgs)
              if (data.customer) {
                const rawName = data.customer.fullName || ''
                const isDefaultName = !rawName || rawName.trim().toLowerCase() === 'khách web chat'

                const nextProfile = {
                  fullName: isDefaultName ? '' : rawName,
                  phone: data.customer.phone || '',
                  email: data.customer.email || '',
                  address: (data.customer.address || ''),
                }
                setProfile(nextProfile)

                if (
                  nextProfile.fullName ||
                  nextProfile.phone ||
                  nextProfile.email ||
                  nextProfile.address
                ) {
                  setShowProfileForm(false)
                }
              }
            }
          }
        } else {
          // Load existing messages
          const res = await fetch(`${base}/chat/conversations/${convId}`)
          if (res.ok) {
            const data = await res.json()
            const msgs = Array.isArray(data.messages) ? data.messages.map(normalizeMessage).filter(Boolean) : []
            if (!cancelled) {
              setMessages(msgs)
              if (data.customer) {
                const rawName = data.customer.fullName || ''
                const isDefaultName = !rawName || rawName.trim().toLowerCase() === 'khách web chat'

                const nextProfile = {
                  fullName: isDefaultName ? '' : rawName,
                  phone: data.customer.phone || '',
                  email: data.customer.email || '',
                  address: (data.customer.address || ''),
                }
                setProfile(nextProfile)

                if (
                  nextProfile.fullName ||
                  nextProfile.phone ||
                  nextProfile.email ||
                  nextProfile.address
                ) {
                  setShowProfileForm(false)
                }
              }
            }
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.')
        }
      } finally {
        if (!cancelled) {
          setInitializing(false)
        }
      }
    }

    init()

    return () => {
      cancelled = true
    }
  }, [visitorId, isOpen, conversationId])

  useEffect(() => {
    if (!visitorId || !conversationId) return

    const base = (WS_BASE || API_BASE || '').replace(/\/+$/, '')
    const socket = io(`${base}/web-chat`, {
      transports: ['websocket'],
      query: { visitorId },
    })

    socketRef.current = socket

    socket.on('newMessage', (message) => {
      const normalized = normalizeMessage(message)
      if (!normalized) return
      setMessages((prev) => {
        if (prev.some((m) => m.id === normalized.id)) return prev
        return [...prev, normalized]
      })
    })

    socket.emit('joinConversation', { conversationId })

    return () => {
      try {
        socket.disconnect()
      } catch (e) {
        // ignore
      }
      socketRef.current = null
    }
  }, [visitorId, conversationId])

  // Khi mở popup hoặc khi có thêm tin nhắn mới, luôn cuộn xuống tin nhắn cuối cùng
  useEffect(() => {
    if (!isOpen) return
    if (!messagesEndRef.current) return
    try {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end' })
    } catch (e) {
      // ignore
    }
  }, [isOpen, messages.length])

  const handleSend = async () => {
    const text = inputValue.trim()
    if (!text || !visitorId || !conversationId || sending) return
    setSending(true)
    setError('')
    try {
      const base = (API_BASE || '').replace(/\/+$/, '')
      const res = await fetch(`${base}/web-chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId, conversationId, content: text }),
      })
      if (!res.ok) {
        throw new Error('Không gửi được tin nhắn. Vui lòng thử lại.')
      }
      const data = await res.json()
      const msg = normalizeMessage(data)
      if (msg) {
        // Tránh trùng lặp với tin nhắn cùng ID đã nhận qua WebSocket
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev
          return [...prev, msg]
        })
      }
      setInputValue('')
    } catch (e) {
      setError(e.message || 'Có lỗi xảy ra khi gửi tin nhắn.')
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSaveProfile = async () => {
    if (!visitorId || !conversationId) return
    const payload = {
      conversationId,
      visitorId,
      fullName: profile.fullName || undefined,
      phone: profile.phone || undefined,
      email: profile.email || undefined,
      address: profile.address || undefined,
    }

    // Nếu không có gì để lưu thì bỏ qua
    if (!payload.fullName && !payload.phone && !payload.email && !payload.address) return

    setSavingProfile(true)
    setError('')
    try {
      const base = (API_BASE || '').replace(/\/+$/, '')
      const res = await fetch(`${base}/web-chat/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        throw new Error('Không lưu được thông tin liên hệ. Vui lòng thử lại.')
      }
      const updated = await res.json()
      if (updated) {
        setProfile({
          fullName: updated.fullName || profile.fullName,
          phone: updated.phone || profile.phone,
          email: updated.email || profile.email,
          address: (updated.address || profile.address || ''),
        })
      }

      // Sau khi lưu profile, gửi 1 tin nhắn tổng hợp thông tin để agent nhìn thấy rõ (plain text, không markdown)
      const lines = []
      if (payload.fullName) lines.push(`• Họ và tên: ${payload.fullName}`)
      if (payload.phone) lines.push(`• Số điện thoại: ${payload.phone}`)
      if (payload.email) lines.push(`• Email: ${payload.email}`)
      if (payload.address) lines.push(`• Địa chỉ: ${payload.address}`)

      if (lines.length > 0) {
        const content = [
          'Thông tin liên hệ của khách:',
          ...lines,
        ].join('\n')
        try {
          const resMsg = await fetch(`${base}/web-chat/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visitorId, conversationId, content }),
          })
          if (resMsg.ok) {
            const data = await resMsg.json()
            const msg = normalizeMessage(data)
            if (msg) {
              setMessages((prev) => {
                if (prev.some((m) => m.id === msg.id)) return prev
                return [...prev, msg]
              })
            }
          }
        } catch (e) {
          // Nếu gửi tin nhắn thất bại thì vẫn giữ profile, không cần báo lỗi lớn
          console.error('Failed to send contact info message', e)
        }
      }
      setProfileSaved(true)
      setShowProfileForm(false)
      setTimeout(() => setProfileSaved(false), 3000)
    } catch (e) {
      setError(e.message || 'Có lỗi xảy ra khi lưu thông tin liên hệ.')
    } finally {
      setSavingProfile(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup tư vấn */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-72 sm:w-80"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-cyan-500/40 via-blue-500/30 to-purple-500/40 p-[1px] shadow-2xl shadow-cyan-900/40">
              <div
                className={`rounded-3xl backdrop-blur-xl px-4 pt-3 pb-3.5 flex flex-col max-h-[440px] ${
                  theme === 'light'
                    ? 'bg-white/95 border border-slate-200 text-slate-900 shadow-xl shadow-slate-900/5'
                    : 'bg-slate-950/95 border border-white/5 text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                          <img
                            src="/img/logoTLL.png"
                            alt="TLL Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-[2px] border-slate-950" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold tracking-wide">Khách Web Chat</h3>
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-[2px] text-[10px] font-medium text-emerald-700 border border-emerald-400/30">
                          Online
                        </span>
                      </div>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          theme === 'light' ? 'text-slate-500' : 'text-white/60'
                        }`}
                      >
                        Trao đổi trực tiếp với đội ngũ TLL OmniAI.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleOpen}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors border border-white/10"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex-1 min-h-[200px] max-h-[260px] overflow-y-auto space-y-2.5 pr-1 mb-2 pt-1">
                  {messages.length === 0 && !initializing && (
                    <div
                      className={`text-[11px] text-center mt-6 ${
                        theme === 'light' ? 'text-slate-500' : 'text-white/60'
                      }`}
                    >
                      Bắt đầu cuộc trò chuyện bằng cách nhập tin nhắn bên dưới.
                    </div>
                  )}
                  {initializing && (
                    <div
                      className={`text-[11px] text-center mt-4 ${
                        theme === 'light' ? 'text-slate-500' : 'text-white/60'
                      }`}
                    >
                      Đang khởi tạo cuộc trò chuyện...
                    </div>
                  )}
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.senderType === 'customer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`rounded-2xl px-3 py-1.5 text-[11px] max-w-[80%] leading-relaxed whitespace-pre-line ${
                          m.senderType === 'customer'
                            ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-white rounded-br-2xl rounded-tl-2xl shadow-md shadow-cyan-500/30'
                            : 'bg-white/95 text-slate-900 rounded-bl-2xl rounded-tr-2xl shadow-md shadow-slate-900/10 border border-slate-200/70'
                        }`}
                      >
                        {m.content || ''}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {error && (
                  <div className="text-[10px] text-red-500 mb-1">{error}</div>
                )}

                <div
                  className={`pt-2 mt-auto space-y-2 border-t ${
                    theme === 'light' ? 'border-slate-200/80' : 'border-white/10'
                  }`}
                >
                  <textarea
                    rows={2}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tin nhắn..."
                    className={`w-full rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 resize-none mb-1 ${
                      theme === 'light'
                        ? 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-400/70'
                        : 'bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/60'
                    }`}
                    disabled={sending || initializing || !conversationId}
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={sending || initializing || !conversationId || !inputValue.trim()}
                    className="w-full mt-0.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {sending ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form thông tin liên hệ (tùy chọn) - hiển thị bên ngoài popup, ngay bên cạnh */}
      {isOpen && showProfileForm && (
        <div
          className={`w-72 sm:w-80 rounded-2xl px-3.5 py-3 shadow-2xl backdrop-blur-xl mt-2 border ${
            theme === 'light'
              ? 'bg-white text-slate-900 border-cyan-300/60 shadow-slate-900/5'
              : 'bg-slate-900/90 text-white border-cyan-400/40'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex flex-col">
              <span
                className={`text-[11px] font-semibold tracking-wide ${
                  theme === 'light' ? 'text-slate-900' : 'text-white/90'
                }`}
              >
                Thông tin liên hệ
              </span>
              <span
                className={`text-[10px] ${
                  theme === 'light' ? 'text-slate-500' : 'text-white/45'
                }`}
              >
                Giúp đội tư vấn gọi lại chính xác hơn
              </span>
            </div>
            {profileSaved && (
              <span className="text-[10px] text-emerald-300 whitespace-nowrap ml-1">Đã lưu ✓</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              placeholder="Họ và tên"
              value={profile.fullName}
              onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
              className={`w-full rounded-lg px-2.5 py-1.5 text-[11px] outline-none focus:ring-1 ${
                theme === 'light'
                  ? 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-400/70'
                  : 'bg-slate-900/60 border border-white/15 text-white placeholder:text-white/35 focus:border-cyan-400 focus:ring-cyan-400/60'
              }`}
            />
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={profile.phone}
                onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                className={`w-full rounded-lg px-2.5 py-1.5 text-[11px] outline-none focus:ring-1 ${
                  theme === 'light'
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-400/70'
                    : 'bg-slate-900/60 border border-white/15 text-white placeholder:text-white/35 focus:border-cyan-400 focus:ring-cyan-400/60'
                }`}
              />
              <input
                type="email"
                placeholder="Email (không bắt buộc)"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                className={`w-full rounded-lg px-2.5 py-1.5 text-[11px] outline-none focus:ring-1 ${
                  theme === 'light'
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-400/70'
                    : 'bg-slate-900/60 border border-white/15 text-white placeholder:text-white/35 focus:border-cyan-400 focus:ring-cyan-400/60'
                }`}
              />
            </div>
            <input
              type="text"
              placeholder="Địa chỉ (không bắt buộc)"
              value={profile.address}
              onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
              className={`w-full rounded-lg px-2.5 py-1.5 text-[11px] outline-none focus:ring-1 ${
                theme === 'light'
                  ? 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-400/70'
                  : 'bg-slate-900/60 border border-white/15 text-white placeholder:text-white/35 focus:border-cyan-400 focus:ring-cyan-400/60'
              }`}
            />
            <div className="flex items-center justify-between pt-0.5">
              <span
                className={`text-[9px] ${
                  theme === 'light' ? 'text-slate-500' : 'text-white/40'
                }`}
              >
                Không bắt buộc, nhưng nên điền để đội ngũ tư vấn hỗ trợ chính xác hơn.
              </span>
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={savingProfile || !conversationId}
                className="ml-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-[10px] font-semibold px-3 py-1 text-white shadow-sm shadow-cyan-500/40 transition disabled:opacity-60 disabled:hover:from-cyan-500 disabled:hover:to-blue-500"
              >
                {savingProfile ? 'Đang lưu...' : 'Lưu thông tin'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nút tròn mở popup */}
      {!isOpen && (
        <div className="relative">
          <button
            type="button"
            onClick={toggleOpen}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-cyan-400/70 shadow-xl shadow-black/40 bg-transparent hover:scale-105 active:scale-95 transition-transform"
            aria-label="Mở popup tư vấn"
          >
            <img
              src="/img/anh.jpg"
              alt="Chat Icon"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default ConsultationWidget
