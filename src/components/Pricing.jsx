import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

const Pricing = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const plans = [
    {
      name: 'Gói khởi đầu',
      price: '1.200.000₫',
      period: '/tháng',
      description: 'Phù hợp cho nhóm nhỏ bắt đầu',
      features: [
        '3 Kênh',
        '1.000 Tin nhắn/tháng',
        'AI tự động trả lời cơ bản',
        'Hỗ trợ Email',
        '5 Thành viên'
      ],
      highlighted: false
    },
    {
      name: 'Gói chuyên nghiệp',
      price: '3.600.000₫',
      period: '/tháng',
      description: 'Dành cho doanh nghiệp đang phát triển',
      features: [
        '6+ Kênh',
        '10.000 Tin nhắn/tháng',
        'AI nâng cao với RAG',
        'Hỗ trợ ưu tiên',
        '20 Thành viên',
        'Quy trình tùy chỉnh',
        'Bảng điều khiển phân tích'
      ],
      highlighted: true
    },
    {
      name: 'Gói doanh nghiệp',
      price: 'Tùy chỉnh',
      period: '',
      description: 'Dành cho tổ chức lớn',
      features: [
        'Không giới hạn kênh',
        'Không giới hạn tin nhắn',
        'Huấn luyện AI tùy chỉnh',
        'Hỗ trợ chuyên biệt',
        'Không giới hạn thành viên',
        'Truy cập API',
        'Đảm bảo SLA',
        'Tùy chọn triển khai nội bộ'
      ],
      highlighted: false
    },
  ]

  return (
    <section id="pricing" ref={ref} className="relative py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Bảng giá đơn giản, minh bạch
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Chọn gói hoàn hảo cho doanh nghiệp của bạn. Tất cả các gói đều bao gồm tính năng cốt lõi.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-blue-500/20 to-purple-500/20 border-blue-500/50 scale-105'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold">
                  Phổ biến nhất
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-white/60 text-sm mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-black text-white">
                  {plan.price}
                </span>
                <span className="text-white/60 text-lg">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white/80">
                    <FaCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.name === 'Gói doanh nghiệp' ? 'Liên hệ bán hàng' : 'Bắt đầu ngay'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center text-white/60"
        >
          <p>Tất cả các gói bao gồm dùng thử miễn phí 14 ngày. Không cần thẻ tín dụng.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
