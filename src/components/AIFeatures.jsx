import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaRobot, FaComments, FaMicrophone, FaClock } from 'react-icons/fa'

const AIFeatures = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <FaComments className="w-8 h-8" />,
      title: 'Hộp thư thống nhất',
      description: 'Quản lý hội thoại từ 6+ kênh trong một bảng điều khiển tập trung. Không bỏ lỡ tin nhắn nào.',
      color: '#3b82f6'
    },
    {
      icon: <FaRobot className="w-8 h-8" />,
      title: 'AI tự động trả lời',
      description: 'Phản hồi thông minh được hỗ trợ bởi công nghệ RAG. Câu trả lời nhận biết ngữ cảnh từ cơ sở tri thức của bạn.',
      color: '#8b5cf6'
    },
    {
      icon: <FaMicrophone className="w-8 h-8" />,
      title: 'Chuyển giọng nói thành văn bản',
      description: 'Tự động chuyển đổi tin nhắn thoại bằng Google Cloud Speech-to-Text API.',
      color: '#10b981'
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: 'Tin nhắn định lịch',
      description: 'Lên lịch gửi tin trên nhiều kênh. Tin nhắn tự động với cron jobs.',
      color: '#f59e0b'
    },
  ]

  return (
    <section ref={ref} className="relative py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Hội thoại thông minh với AI
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Tận dụng công nghệ AI để tự động hóa quy trình, tối ưu trải nghiệm khách hàng, 
            và tăng doanh thu đa kênh hiệu quả.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all card-glow"
            >
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${feature.color}dd, ${feature.color}99)`,
                  boxShadow: `0 10px 30px ${feature.color}40`
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${feature.color}15, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Features List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            Thêm nhiều tính năng thông minh
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-white/70">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Chỉ số hài lòng khách hàng (CSI)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Mẫu tin nhắn nhanh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Ghi chú & Lịch sử khách hàng</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Quản lý nhãn & thẻ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Cập nhật thời gian thực (3-5s)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Hỗ trợ đa ngôn ngữ</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AIFeatures
