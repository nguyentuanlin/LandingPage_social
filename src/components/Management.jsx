import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaUsers, FaChartLine, FaDatabase, FaShieldAlt } from 'react-icons/fa'

const Management = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <FaUsers className="w-10 h-10" />,
      title: 'Cộng tác nhóm',
      description: 'Phân quyền đa vai trò, phân công người dùng-kênh và định tuyến nhân viên hiệu quả.',
      items: ['Truy cập theo vai trò', 'Phân công kênh', 'Hiệu suất nhân viên']
    },
    {
      icon: <FaChartLine className="w-10 h-10" />,
      title: 'Phân tích & Báo cáo',
      description: 'Bảng điều khiển thời gian thực, chỉ số hội thoại và theo dõi sự hài lòng khách hàng.',
      items: ['Theo dõi CSI', 'Thời gian phản hồi', 'Tỷ lệ chuyển đổi']
    },
    {
      icon: <FaDatabase className="w-10 h-10" />,
      title: 'Cơ sở tri thức',
      description: 'Quản lý tài liệu tập trung với tìm kiếm vector và tích hợp RAG.',
      items: ['Tải tài liệu lên', 'Tìm kiếm vector', 'Kiểm soát truy cập']
    },
    {
      icon: <FaShieldAlt className="w-10 h-10" />,
      title: 'Bảo mật & Tuân thủ',
      description: 'Bảo mật cấp doanh nghiệp với xác thực JWT và theo dõi lịch sử truy cập.',
      items: ['Xác thực JWT', 'Nhật ký kiểm toán', 'Mã hóa dữ liệu']
    },
  ]

  return (
    <section
      id="management"
      ref={ref}
      className="relative py-20 px-4 bg-gradient-to-b from-transparent to-blue-500/5"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Quản lý tập trung
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Công cụ mạnh mẽ để quản lý hoạt động đa kênh, cộng tác nhóm, 
            và thông tin khách hàng từ một bảng điều khiển thông minh.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Items */}
              <ul className="space-y-2">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10">
            <p className="text-white/80 text-lg">
              <span className="font-bold text-white">Sẵn sàng cho doanh nghiệp:</span> Tích hợp API & Webhook, 
              Quy trình tùy chỉnh, Hỗ trợ đa ngôn ngữ và Giám sát 24/7
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Management
