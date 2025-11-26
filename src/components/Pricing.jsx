import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

const Pricing = ({ theme = 'dark' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const plans = [
    {
      name: 'Gói miễn phí giai đoạn khởi động',
      price: 'Miễn phí',
      period: '',
      description:
        'Dành cho tất cả nhà cung cấp và doanh nghiệp muốn trải nghiệm hệ thống – mở toàn bộ tính năng trong giai đoạn khởi động, không phân biệt quy mô.',
      features: [
        'Kết nối Facebook, Instagram, Telegram, Gmail, Zalo, WhatsApp',
        'Quản lý hội thoại & khách hàng đa kênh trong một inbox thống nhất',
        'AI trả lời tự động kết hợp RAG theo tri thức doanh nghiệp',
        'Dashboard theo kênh & nhân viên để theo dõi hiệu suất',
        'Không giới hạn số lượng thành viên trong giai đoạn thử nghiệm',
        'Không yêu cầu thẻ tín dụng, không ràng buộc hợp đồng trong giai đoạn này'
      ],
      highlighted: true,
    },
  ]

  return (
    <section
      id="pricing"
      ref={ref}
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Dùng miễn phí cho tất cả nhà cung cấp
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Trong giai đoạn khởi động, chúng tôi mở toàn bộ hệ thống cho mọi doanh nghiệp sử dụng <span className="font-semibold text-white">hoàn toàn miễn phí</span>. 
            Khi bắt đầu thu phí, bảng giá sẽ được công bố rõ ràng và minh bạch trước đó.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all pricing-card ${
                plan.highlighted
                  ? 'pricing-card--highlight bg-gradient-to-b from-blue-500/20 to-purple-500/20 border-blue-500/50 scale-105'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlighted && (
                <div className="pricing-badge absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold">
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
              <a
                href="https://smile.cmcu.edu.vn/landing"
                target="_blank"
                rel="noopener noreferrer"
                className={`pricing-cta w-full py-3 rounded-xl font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Bắt đầu dùng miễn phí
              </a>
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
          <p>
            Giai đoạn này chúng tôi chưa thu bất kỳ khoản phí nào. Chính sách giá chi tiết sẽ được công bố khi hệ thống đạt đủ người dùng và đi vào vận hành ổn định.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
