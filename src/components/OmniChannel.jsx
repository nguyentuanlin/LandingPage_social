import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaFacebook, FaTelegram, FaEnvelope, FaWhatsapp, FaInstagram } from 'react-icons/fa'

const OmniChannel = ({ language = 'vi' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const isEn = language === 'en'

  const channels = [
    {
      name: 'Facebook Messenger',
      icon: <FaFacebook className="w-8 h-8" />,
      color: '#1877F2',
      features: ['Hộp thư trang', 'Sự kiện Webhook', 'Tin nhắn mẫu']
    },
    {
      name: 'Telegram',
      icon: <FaTelegram className="w-8 h-8" />,
      color: '#2AABEE',
      features: ['Bot API', 'Hỗ trợ File/Voice', 'Nút trả lời']
    },
    {
      name: 'Gmail (Email)',
      icon: <FaEnvelope className="w-8 h-8" />,
      color: '#EA4335',
      features: ['Đến/Đi', 'Chuỗi tin nhắn', 'Đính kèm']
    },
    {
      name: 'Zalo OA',
      icon: (
        <img
          src="/img/zalo-logo.png"
          alt="Zalo OA"
          className="w-8 h-8 object-contain"
        />
      ),
      color: '#0068FF',
      features: ['Tài khoản chính thức', 'Webhook', 'Mẫu tin nhắn']
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-8 h-8" />,
      color: '#25D366',
      features: ['Business API', 'Mẫu tin nhắn', 'Chăm sóc sau bán']
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-8 h-8" />,
      color: '#E4405F',
      features: ['Graph API', 'Tin nhắn trực tiếp', 'Stories']
    },
  ]

  return (
    <section
      ref={ref}
      id="omnichannel"
      className="relative py-20 px-4 scroll-mt-24 lg:scroll-mt-32"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isEn ? 'Integrate ' : 'Tích hợp '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {isEn ? 'multiple channels' : 'đa kênh'}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            {isEn
              ? 'Connect Facebook, Telegram, Gmail, Zalo, Instagram and WhatsApp into a unified inbox. Automate replies, route by skills, manage SLA and sync your knowledge base.'
              : 'Kết nối Facebook, Telegram, Gmail, Zalo, Instagram và WhatsApp vào một hộp thư thống nhất. Tự động hóa phản hồi, định tuyến theo kỹ năng, quản lý SLA và đồng bộ cơ sở tri thức.'}
          </p>
        </motion.div>

        {/* Channels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {channels.map((channel, idx) => (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
              style={{
                boxShadow: `0 10px 30px ${channel.color}15`
              }}
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${channel.color}dd, ${channel.color}99)`,
                  }}
                >
                  {channel.icon}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {channel.name}
                </h3>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {channel.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      color: channel.color,
                      borderColor: channel.color,
                      background: `${channel.color}15`
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unified Inbox Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-dashed border-white/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            {isEn ? 'Unified inbox + Artificial intelligence' : 'Hộp thư thống nhất + Trí tuệ nhân tạo'}
          </h3>
          <p className="text-white/70 max-w-3xl mx-auto">
            {isEn
              ? 'Merge all conversations from every channel into one unified flow. Combine multi‑source RAG to reply accurately based on context, keyword/out‑of‑hours scenarios and agent assignment.'
              : 'Hợp nhất tất cả cuộc hội thoại từ nhiều kênh vào một luồng thống nhất. Kết hợp RAG đa nguồn để phản hồi chính xác dựa trên ngữ cảnh, kịch bản từ khóa/ngoài giờ, và phân công cho nhân viên phù hợp.'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default OmniChannel
