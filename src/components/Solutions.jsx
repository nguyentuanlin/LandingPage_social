import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMessageSquare,
  FiCpu,
  FiShoppingCart,
  FiGrid,
  FiBox,
  FiPackage,
  FiFileText,
  FiTruck,
  FiPercent,
  FiDollarSign,
  FiStar,
  FiBookOpen,
  FiChevronRight,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiTarget,
  FiHeart,
  FiAward,
} from 'react-icons/fi'
// Công thức chi tiết CSI được giữ nội bộ, không hiển thị trên landing page

// Floating Icons Background Component
const FloatingIcons = ({ theme = 'dark' }) => {
  const floatingIcons = [
    { icon: FiMessageSquare, x: '8%', y: '12%', delay: 0, color: 'cyan', size: 'lg' },
    { icon: FiCpu, x: '88%', y: '18%', delay: 1, color: 'purple', size: 'md' },
    { icon: FiShoppingCart, x: '12%', y: '65%', delay: 2, color: 'emerald', size: 'lg' },
    { icon: FiGrid, x: '92%', y: '75%', delay: 3, color: 'blue', size: 'sm' },
    { icon: FiBox, x: '3%', y: '88%', delay: 4, color: 'amber', size: 'md' },
    { icon: FiPackage, x: '85%', y: '8%', delay: 5, color: 'orange', size: 'sm' },
    { icon: FiFileText, x: '22%', y: '28%', delay: 6, color: 'rose', size: 'lg' },
    { icon: FiTruck, x: '78%', y: '42%', delay: 7, color: 'violet', size: 'md' },
    { icon: FiPercent, x: '32%', y: '82%', delay: 8, color: 'pink', size: 'sm' },
    { icon: FiDollarSign, x: '68%', y: '88%', delay: 9, color: 'green', size: 'lg' },
    { icon: FiStar, x: '48%', y: '5%', delay: 10, color: 'yellow', size: 'md' },
    { icon: FiBookOpen, x: '58%', y: '22%', delay: 11, color: 'indigo', size: 'sm' },
    { icon: FiUsers, x: '18%', y: '45%', delay: 12, color: 'teal', size: 'lg' },
    { icon: FiTrendingUp, x: '72%', y: '58%', delay: 13, color: 'lime', size: 'md' },
    { icon: FiZap, x: '42%', y: '52%', delay: 14, color: 'red', size: 'sm' },
    { icon: FiTarget, x: '82%', y: '32%', delay: 15, color: 'sky', size: 'lg' },
    { icon: FiHeart, x: '13%', y: '78%', delay: 16, color: 'fuchsia', size: 'md' },
    { icon: FiAward, x: '62%', y: '12%', delay: 17, color: 'slate', size: 'sm' },
  ]

  if (theme === 'light') {
    return null
  }

  const getSizeClasses = (size) => {
    switch (size) {
      case 'sm': return { container: 'p-2', icon: 'w-4 h-4' }
      case 'lg': return { container: 'p-4', icon: 'w-8 h-8' }
      default: return { container: 'p-3', icon: 'w-6 h-6' }
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((item, index) => {
        const Icon = item.icon
        const sizeClasses = getSizeClasses(item.size)
        return (
          <motion.div
            key={index}
            className="absolute hidden md:block"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            animate={{ 
              opacity: [0, 0.4, 0.7, 0.3, 0.6, 0.2],
              scale: [0, 1.1, 0.9, 1.2, 0.8, 1],
              rotate: [0, 180, 360],
              x: [0, 10, -5, 15, -10, 0],
              y: [0, -15, 8, -20, 12, 0]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              delay: item.delay * 0.3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <div className={`${sizeClasses.container} rounded-2xl bg-gradient-to-br from-${item.color}-400/8 to-${item.color}-600/4 backdrop-blur-sm border border-${item.color}-400/15 shadow-lg hover:shadow-xl transition-all duration-300`}>
              <Icon className={`${sizeClasses.icon} text-${item.color}-400/70`} />
            </div>
          </motion.div>
        )
      })}
      
      {/* Mobile simplified version */}
      <div className="block md:hidden">
        {floatingIcons.slice(0, 8).map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={`mobile-${index}`}
              className="absolute"
              style={{ 
                left: `${15 + (index % 4) * 20}%`, 
                top: `${20 + Math.floor(index / 4) * 40}%` 
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0.5, 0.2],
                scale: [0, 1, 0.8, 1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 10,
                delay: index * 0.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              <div className={`p-2 rounded-xl bg-gradient-to-br from-${item.color}-400/6 to-${item.color}-600/3 backdrop-blur-sm border border-${item.color}-400/10`}>
                <Icon className={`w-4 h-4 text-${item.color}-400/60`} />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const Solutions = ({ theme = 'dark', language = 'vi' }) => {
  const isEn = language === 'en'
  const sections = useMemo(() => ([
    { 
      id: 'intro', 
      label: 'Giới thiệu', 
      icon: FiMessageSquare,
      highlights: ['Omnichannel Inbox', 'AI + CRM', '3 backend chuyên biệt']
    },
    { 
      id: 'intelligence', 
      label: 'TLL Intelligence', 
      icon: FiCpu,
      highlights: ['RAG theo tri thức doanh nghiệp', 'Speech-to-Text cho voice Telegram', 'Phân tích, tóm tắt hội thoại']
    },
    { 
      id: 'omni-experience', 
      label: 'Trải nghiệm đa kênh', 
      icon: FiShoppingCart,
      highlights: ['Facebook, Instagram, Telegram, Gmail, Outlook', 'Hợp nhất hội thoại đa kênh', 'Email hiển thị ngay trong chat']
    },
    { 
      id: 'centralized-management', 
      label: 'Quản lý hội thoại & khách hàng', 
      icon: FiGrid,
      highlights: ['Nhật ký khách hàng & hồ sơ social', 'Gắn nhãn tin nhắn, quản lý Labels', 'Phân công kênh cho từng nhân viên']
    },
    { 
      id: 'tools-automation', 
      label: 'Công cụ & Tự động hoá', 
      icon: FiZap,
      highlights: ['Mẫu email & template gửi nhanh', 'Đồng bộ Gmail/Outlook linh hoạt', 'Cấu hình Social Networks tập trung']
    },
    { 
      id: 'csi', 
      label: 'CSI (Đo hài lòng)', 
      icon: FiStar,
      highlights: ['CSI theo cảm xúc & thời gian', 'Biểu đồ CSI theo kênh/nhân viên', 'Theo dõi trải nghiệm khách hàng']
    },
  ]), [])

  const SCROLL_OFFSET = 160

  const [active, setActive] = useState('intro')
  const [expandedId, setExpandedId] = useState('intro')
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const anchor = SCROLL_OFFSET
      let currentId = sections[0]?.id
      let minDistance = Infinity

      sections.forEach((s) => {
        const el = document.getElementById(s.id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const distance = Math.abs(rect.top - anchor)
        if (distance < minDistance) {
          minDistance = distance
          currentId = s.id
        }
      })

      if (currentId) {
        setActive(currentId)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  // CSI calculator state
  const [csat, setCsat] = useState(82) // 0-100
  const [resolution, setResolution] = useState(88) // 0-100
  const [speed, setSpeed] = useState(100) // 0-100

  const csi = useMemo(() => {
    const score = 0.5 * csat + 0.3 * resolution + 0.2 * speed
    return Math.round(score)
  }, [csat, resolution, speed])

  // Interactive CSI (emotion/time) calculator
  // Các tham số và công thức chi tiết CSI được giữ trong nội bộ sản phẩm,
  // landing page chỉ hiển thị khái niệm trực quan (slider + gauge + KPI).

  const intelligenceItems = isEn
    ? [
        {
          title: 'RAG with enterprise knowledge',
          badge: 'No hallucination',
          desc: 'Connects directly to your internal documents, policies and procedures so answers stay on‑brand and grounded.',
        },
        {
          title: 'Speech‑to‑Text for Telegram voice',
          badge: 'Understand customers in real time',
          desc: 'Automatically converts voice messages to text, saving the full history for AI to analyse and summarise.',
        },
        {
          title: 'Conversation analysis & summarisation',
          badge: 'Instant insight',
          desc: 'Condenses hundreds of messages into a few lines, highlighting buying intent, complaints and next actions for agents.',
        },
      ]
    : [
        {
          title: 'RAG theo tri thức doanh nghiệp',
          badge: 'AI không bịa',
          desc: 'Kết nối trực tiếp với kho tài liệu nội bộ, chính sách và quy trình để trả lời chuẩn giọng thương hiệu.',
        },
        {
          title: 'Speech‑to‑Text cho voice Telegram',
          badge: 'Hiểu khách hàng theo thời gian thực',
          desc: 'Tự động chuyển voice thành văn bản, lưu toàn bộ vào lịch sử hội thoại để AI phân tích & tóm tắt.',
        },
        {
          title: 'Phân tích & tóm tắt hội thoại',
          badge: 'Insight tức thì',
          desc: 'Rút gọn hàng trăm tin nhắn thành vài dòng, highlight ý định mua hàng, khiếu nại và next‑action cho agent.',
        },
      ]

  const omniExperienceItems = isEn
    ? [
        {
          title: 'One unified inbox for every channel',
          desc: 'Pull Facebook, Instagram, Telegram, Gmail and Outlook into a single screen so agents work faster without tab‑hopping or missing messages.',
        },
        {
          title: 'Never ask “Who is this?” again',
          desc: 'The system automatically stitches together cross‑channel history so agents always see full context whenever a customer returns on any channel.',
        },
        {
          title: 'Consistent and measurable experiences',
          desc: 'Standardise reply playbooks across channels while tracking SLA, CSI and response time to optimise each channel and campaign.',
        },
      ]
    : [
        {
          title: 'Một hộp thư hợp nhất cho mọi kênh',
          desc: 'Gom Facebook, Instagram, Telegram, Gmail, Outlook vào một màn hình – agent xử lý nhanh hơn, không còn cảnh nhảy tab và bỏ sót tin.',
        },
        {
          title: 'Không bao giờ hỏi lại “Anh/chị là ai ạ?”',
          desc: 'Hệ thống tự ghép lịch sử hội thoại đa kênh, agent luôn thấy trọn bối cảnh mỗi khi khách quay lại ở bất kỳ kênh nào.',
        },
        {
          title: 'Trải nghiệm nhất quán & đo lường được',
          desc: 'Chuẩn hoá kịch bản trả lời trên tất cả kênh, đồng thời theo dõi SLA, CSI và tốc độ phản hồi để tối ưu từng kênh và chiến dịch.',
        },
      ]

  const centralManagementItems = isEn
    ? [
        {
          title: '360° customer profiles',
          desc: 'Conversation history, social profiles, email, notes and cross‑platform metadata merged into a single timeline.',
        },
        {
          title: 'Smart labels & segmentation',
          desc: 'Tag messages on the fly to filter quickly, build reports and trigger automation scenarios.',
        },
        {
          title: 'Channel & agent dashboards',
          desc: 'See performance per channel and per agent to allocate resources and reward fairly.',
        },
      ]
    : [
        {
          title: 'Hồ sơ khách hàng 360°',
          desc: 'Nhật ký hội thoại, social profile, email, ghi chú và metadata đa nền tảng được gom vào một timeline duy nhất.',
        },
        {
          title: 'Nhãn & phân loại thông minh',
          desc: 'Gắn nhãn trực tiếp trên từng tin nhắn để lọc nhanh, tạo báo cáo và kích hoạt kịch bản tự động hoá.',
        },
        {
          title: 'Dashboard theo kênh & agent',
          desc: 'Nhìn rõ hiệu suất từng kênh và từng nhân viên để phân bổ nguồn lực, thưởng – phạt minh bạch.',
        },
      ]

  const toolsCards = isEn
    ? [
        {
          id: 'tools-email',
          icon: FiFileText,
          title: 'Email & Gmail/Outlook',
          desc: 'Syncs email from Gmail, shows them as cards inside the chat window, and surfaces the real unread count from Outlook.',
          color: 'cyan',
        },
        {
          id: 'tools-voice',
          icon: FiBox,
          title: 'Voice & Speech‑to‑Text',
          desc: 'Receives Telegram voice messages, converts them to text with OpenAI Whisper and stores full metadata.',
          color: 'purple',
        },
        {
          id: 'tools-labels',
          icon: FiPackage,
          title: 'Label & categorisation management',
          desc: 'Dedicated Labels management screen; add or remove tags on each message to organise conversations and drive automation.',
          color: 'emerald',
        },
        {
          id: 'tools-templates',
          icon: FiPercent,
          title: 'Email templates & reply scripts',
          desc: 'Email Template system with preview and emojis; insert quickly into email forms and conversation threads.',
          color: 'pink',
        },
        {
          id: 'tools-config',
          icon: FiTruck,
          title: 'Social networks configuration',
          desc: 'Central configuration for Facebook, Instagram, Telegram, Gmail and Outlook with JSONB metadata and a modern management screen.',
          color: 'indigo',
        },
        {
          id: 'tools-dashboard',
          icon: FiDollarSign,
          title: 'Admin & employee dashboards',
          desc: 'Admin and employee dashboards with stats on conversations, messages, CSI and performance by channel and agent.',
          color: 'amber',
        },
      ]
    : [
        {
          id: 'tools-email',
          icon: FiFileText,
          title: 'Email & Gmail/Outlook',
          desc: 'Đồng bộ email từ Gmail, hiển thị dạng thẻ trong cửa sổ chat; badge số thư chưa đọc thực tế từ Outlook.',
          color: 'cyan',
        },
        {
          id: 'tools-voice',
          icon: FiBox,
          title: 'Voice & Speech-to-Text',
          desc: 'Nhận voice từ Telegram, tự động chuyển sang văn bản bằng OpenAI Whisper và lưu kèm metadata.',
          color: 'purple',
        },
        {
          id: 'tools-labels',
          icon: FiPackage,
          title: 'Quản lý nhãn & phân loại',
          desc: 'Trang quản lý Labels chuyên biệt, gán/bỏ nhãn ngay trên từng tin nhắn để phân loại và tự động hoá.',
          color: 'emerald',
        },
        {
          id: 'tools-templates',
          icon: FiPercent,
          title: 'Mẫu email & kịch bản trả lời',
          desc: 'Hệ thống Email Template với preview, emoji icon; chèn nhanh vào form gửi mail và tự tạo message trong hội thoại.',
          color: 'pink',
        },
        {
          id: 'tools-config',
          icon: FiTruck,
          title: 'Cấu hình Social Networks',
          desc: 'Cấu hình tập trung Facebook, Instagram, Telegram, Gmail, Outlook với metadata JSONB và màn hình quản lý hiện đại.',
          color: 'indigo',
        },
        {
          id: 'tools-dashboard',
          icon: FiDollarSign,
          title: 'Dashboard & Employee Dashboard',
          desc: 'Dashboard admin và dashboard nhân viên với thống kê cuộc hội thoại, tin nhắn, CSI, hiệu suất theo kênh và agent.',
          color: 'amber',
        },
      ]

  return (
    <section
      ref={containerRef}
      id="solutions"
      className="relative py-24 px-4 lg:py-32 overflow-x-hidden scroll-mt-24 lg:scroll-mt-32"
    >
      {/* Floating Icons Background */}
      <FloatingIcons theme={theme} />
      
      {/* Section Header */}
      <div className="container mx-auto max-w-7xl mb-16 lg:mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isEn ? 'Solutions & ' : 'Giải pháp & '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {isEn ? 'Features' : 'Tính năng'}
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {isEn
              ? 'Explore a complete solution set that helps your business optimize customer experience and operate efficiently.'
              : 'Khám phá bộ giải pháp toàn diện giúp doanh nghiệp tối ưu hóa trải nghiệm khách hàng và vận hành hiệu quả'}
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-8 lg:gap-12 relative z-10">
        {/* Sidebar Navigation */}
        <div className="h-max mb-8 lg:mb-0 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-5 shadow-2xl"
          >
            <div className="space-y-2">
              {sections.map((s, idx) => {
                const Icon = s.icon
                const isExpanded = expandedId === s.id
                const isActive = active === s.id
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <button
                      onClick={() => {
                        setExpandedId(s.id)
                        setActive(s.id)
                        handleNavClick(s.id)
                      }}
                      className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 shadow-lg shadow-cyan-500/20' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      <div className="flex items-center gap-3 px-5 py-4">
                        <div className={`solutions-nav-icon p-2 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-400' 
                            : 'bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`flex-1 text-left text-base font-medium transition-colors ${
                          isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                        }`}>
                          {s.label}
                        </span>
                        <FiChevronRight className={`w-4 h-4 transition-all duration-300 ${
                          isExpanded ? 'rotate-90' : 'rotate-0'
                        } ${isActive ? 'text-cyan-400' : 'text-white/50 group-hover:text-white/70'}`} />
                      </div>
                    </button>
                    
                    {/* Expanded highlights */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 py-3 space-y-2">
                            {s.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                                <div className="w-1 h-1 rounded-full bg-cyan-400/50" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="space-y-12 lg:space-y-16">
          {/* Giới thiệu */}
          <motion.div 
            id="intro" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="solutions-section-icon p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
                  <FiMessageSquare className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {isEn ? 'Overview' : 'Giới thiệu'}
                </h3>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                {isEn ? (
                  <>
                    TLL Omnichannel is a multi‑channel <span className="text-cyan-400 font-semibold">AI CRM platform</span>{' '}
                    that unifies social & email channels
                    <span className="text-cyan-400 font-semibold"> (for example: Facebook, Instagram, Telegram, Gmail, Outlook)</span>{' '}
                    into a single inbox designed specifically for modern customer support teams.
                    <span className="block mt-3">
                      Instead of agents having to open many tabs, take scattered notes and struggle to follow customer history,
                      every conversation, social profile and service‑quality metric like CSI, SLA and agent performance is
                      centralized in one place. From there, AI can analyse, summarise context and suggest smart replies, helping
                      businesses scale customer care while still keeping a personalised experience.
                    </span>
                  </>
                ) : (
                  <>
                    TLL Omnichannel là nền tảng <span className="text-cyan-400 font-semibold">AI CRM đa kênh</span>{' '}
                    giúp hợp nhất các kênh social & email
                    <span className="text-cyan-400 font-semibold"> (ví dụ: Facebook, Instagram, Telegram, Gmail, Outlook)</span>{' '}
                    vào một inbox duy nhất, được thiết kế riêng cho đội chăm sóc khách hàng hiện đại.
                    <span className="block mt-3">
                      Thay vì nhân viên phải mở nhiều tab, ghi chú rời rạc và khó theo dõi lịch sử khách hàng, mọi cuộc hội thoại,
                      hồ sơ social và các chỉ số chất lượng dịch vụ như CSI, SLA, hiệu suất agent đều được tập trung về một nơi.
                      Từ đó AI có thể phân tích, tóm tắt bối cảnh và gợi ý phản hồi thông minh, giúp doanh nghiệp mở rộng quy mô
                      chăm sóc khách hàng mà vẫn giữ trải nghiệm cá nhân hóa.
                    </span>
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* TLL Intelligence */}
          <motion.div 
            id="intelligence" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-purple-400/50 transition-all duration-300 overflow-hidden scroll-mt-28 lg:scroll-mt-36"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="solutions-section-icon p-3 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30">
                  <FiCpu className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    {isEn ? 'TLL Intelligence' : 'TLL Intelligence'}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 max-w-2xl">
                    {isEn
                      ? 'The “AI brain” of the system – it understands context and your own enterprise knowledge instead of giving generic chatbot answers.'
                      : '“Bộ não AI” của hệ thống, hiểu ngữ cảnh và tri thức riêng của doanh nghiệp thay vì trả lời chung chung như chatbot phổ thông'}
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                {intelligenceItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/40 transition-all"
                  >
                    <div className="solutions-sub-icon mt-1 p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/40">
                      <FiCheckCircle className="w-4 h-4 text-purple-200" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-white font-semibold">{item.title}</div>
                        {item.badge && (
                          <span className="solutions-badge px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/20 text-purple-200 border border-purple-300/30 whitespace-nowrap">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-white/60 text-sm mt-1">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trải nghiệm chăm sóc khách hàng đa kênh */}
          <motion.div 
            id="omni-experience" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-emerald-400/50 transition-all duration-300 overflow-hidden scroll-mt-28 lg:scroll-mt-36"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="solutions-section-icon p-3 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/30">
                  <FiShoppingCart className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    {isEn
                      ? 'Seamless omnichannel customer journey'
                      : 'Trải nghiệm khách hàng đa kênh liền mạch'}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 max-w-2xl">
                    {isEn
                      ? 'Wherever customers message you, they are recognised immediately; the journey stays continuous across Facebook, Instagram, Telegram, Gmail and Outlook.'
                      : 'Khách nhắn ở đâu cũng được nhận diện ngay ở đó; hành trình không bị đứt đoạn giữa Facebook, Instagram, Telegram, Gmail, Outlook.'}
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                {omniExperienceItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-400/40 transition-all"
                  >
                    <div className="solutions-sub-icon mt-1 p-2 rounded-lg bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-300/40">
                      <FiCheckCircle className="w-4 h-4 text-emerald-100" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{item.title}</div>
                      <div className="text-white/70 text-sm mt-1">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quản lý đa kênh tập trung */}
          <motion.div 
            id="centralized-management" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-blue-400/50 transition-all duration-300 overflow-hidden scroll-mt-28 lg:scroll-mt-36"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="solutions-section-icon p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-indigo-500/20 border border-blue-400/30">
                  <FiGrid className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    {isEn ? 'Centralised omnichannel management' : 'Quản lý đa kênh tập trung'}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 max-w-2xl">
                    {isEn
                      ? 'One place to see every customer, conversation and team performance metric – no more fragmented data.'
                      : 'Một nơi duy nhất để nắm toàn bộ khách hàng, hội thoại và hiệu suất đội ngũ – không còn dữ liệu bị chia cắt.'}
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                {centralManagementItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/40 transition-all"
                  >
                    <div className="solutions-sub-icon mt-1 p-2 rounded-lg bg-gradient-to-br from-blue-400/20 to-indigo-500/20 border border-blue-300/40">
                      <FiCheckCircle className="w-4 h-4 text-blue-100" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{item.title}</div>
                      <div className="text-white/70 text-sm mt-1">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tools & Automation Cards */}
          <motion.div 
            id="tools-automation"
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 overflow-hidden scroll-mt-28 lg:scroll-mt-36"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="solutions-section-icon p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
                  <FiZap className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {isEn ? 'Tools & Automation' : 'Công cụ & Tự động hoá'}
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {toolsCards.map((card, idx) => {
                  const Icon = card.icon
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="group relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 lg:p-8 hover:border-white/40 transition-all duration-300 overflow-hidden"
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${card.color}-500/10 to-${card.color}-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`solutions-sub-icon p-2.5 rounded-lg bg-gradient-to-br from-${card.color}-400/20 to-${card.color}-500/20 border border-${card.color}-400/30`}>
                            <Icon className={`w-5 h-5 text-${card.color}-400`} />
                          </div>
                          <h3 className="text-xl font-bold text-white flex-1">{card.title}</h3>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed mt-1">{card.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* CSI Section - Enhanced */}
          <motion.div 
            id="csi" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-yellow-400/50 transition-all duration-300 overflow-hidden scroll-mt-28 lg:scroll-mt-36"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="solutions-section-icon p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30">
                  <FiStar className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">CSI – Customer Satisfaction Index</h3>
                  <p className="text-white/60 text-sm">
                    {isEn
                      ? 'Combined score from three factors: CSAT, Resolution Rate, and Response Speed.'
                      : 'Điểm tổng hợp từ 3 yếu tố: CSAT, Tỷ lệ giải quyết, Tốc độ phản hồi'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Controls */}
                <div className="flex-1 space-y-8">
                  {/* CSAT Slider */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-400/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-semibold">
                        {isEn ? 'Customer satisfaction' : 'Độ hài lòng khách hàng'}
                      </span>
                      <span className="text-2xl font-bold text-cyan-400">{csat}</span>
                    </div>
                    <input 
                      type="range" 
                      min={0} 
                      max={100} 
                      value={csat} 
                      onChange={(e)=>setCsat(parseInt(e.target.value))} 
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${csat}%, rgba(255,255,255,0.1) ${csat}%, rgba(255,255,255,0.1) 100%)`
                      }}
                    />
                  </div>

                  {/* Resolution Rate Slider */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-400/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-semibold">
                        {isEn ? 'Resolution rate' : 'Tỷ lệ giải quyết'}
                      </span>
                      <span className="text-2xl font-bold text-emerald-400">{resolution}%</span>
                    </div>
                    <input 
                      type="range" 
                      min={0} 
                      max={100} 
                      value={resolution} 
                      onChange={(e)=>setResolution(parseInt(e.target.value))} 
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${resolution}%, rgba(255,255,255,0.1) ${resolution}%, rgba(255,255,255,0.1) 100%)`
                      }}
                    />
                  </div>

                  {/* Response Speed Slider */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-400/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-semibold">
                        {isEn ? 'Response speed' : 'Tốc độ phản hồi'}
                      </span>
                      <span className="text-2xl font-bold text-violet-400">{speed}</span>
                    </div>
                    <input 
                      type="range" 
                      min={0} 
                      max={100} 
                      value={speed} 
                      onChange={(e)=>setSpeed(parseInt(e.target.value))} 
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${speed}%, rgba(255,255,255,0.1) ${speed}%, rgba(255,255,255,0.1) 100%)`
                      }}
                    />
                  </div>

                  {/* Chỉ hiển thị tổng điểm CSI, không lộ công thức chi tiết */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                    <div className="text-white/80 mb-2 font-semibold">
                      {isEn ? 'Overall CSI score' : 'Điểm CSI tổng hợp'}
                    </div>
                    <div className="text-white/60 text-sm">
                      {isEn
                        ? 'Based on satisfaction, resolution rate and response speed. This demo shows that when you adjust the sliders above, the system calculates a single CSI score to track customer experience.'
                        : 'Dựa trên độ hài lòng, tỷ lệ giải quyết và tốc độ phản hồi. Ví dụ này cho thấy khi bạn kéo các thanh bên trên, hệ thống sẽ tính ra một điểm CSI duy nhất để theo dõi trải nghiệm khách hàng.'}
                    </div>
                  </div>
                </div>

                {/* CSI Gauge */}
                <div className="w-full lg:w-[280px] flex items-center justify-center">
                  <div className="relative">
                    <div className="relative w-56 h-56">
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-xl animate-pulse" />
                      
                      {/* Progress ring */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `conic-gradient(from 0deg, #fbbf24 0deg, #f59e0b ${csi * 3.6}deg, rgba(255,255,255,0.08) ${csi * 3.6}deg)`
                        }}
                      />
                      
                      {/* Inner circle */}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#0a1128] to-[#0d1836] flex items-center justify-center border-2 border-white/10 shadow-2xl">
                        <div className="text-center">
                          <div className="text-6xl font-black bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1">
                            {csi}
                          </div>
                          <div className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                            {isEn ? 'CSI SCORE' : 'Điểm CSI'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Solutions
