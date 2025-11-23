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
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

// Floating Icons Background Component
const FloatingIcons = () => {
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

const Solutions = () => {
  const sections = useMemo(() => ([
    { 
      id: 'intro', 
      label: 'Giới thiệu', 
      icon: FiMessageSquare,
      highlights: ['Điểm nổi bật', 'Chỉ số chính', 'Tích hợp']
    },
    { 
      id: 'intelligence', 
      label: 'TLL Intelligence', 
      icon: FiCpu,
      highlights: ['RAG trả lời ngữ cảnh', 'STT cho voice messages', 'Gửi tin nhắn định lịch']
    },
    { 
      id: 'omni-experience', 
      label: 'Trải nghiệm mua hàng đa kênh', 
      icon: FiShoppingCart,
      highlights: ['Kết nối đa kênh', 'Đồng bộ hội thoại', 'Phân công & SLA']
    },
    { 
      id: 'centralized-management', 
      label: 'Quản lý đa kênh tập trung', 
      icon: FiGrid,
      highlights: ['Nhật ký khách hàng', 'Mẫu tin nhắn nhanh', 'Báo cáo theo kênh']
    },
    { 
      id: 'product', 
      label: 'Quản lý sản phẩm', 
      icon: FiBox,
      highlights: ['SKU & biến thể', 'Đồng bộ tồn kho', 'Theo dõi kênh']
    },
    { 
      id: 'inventory', 
      label: 'Quản lý kho', 
      icon: FiPackage,
      highlights: ['Nhập/xuất/chuyển', 'Cảnh báo tồn', 'Định mức']
    },
    { 
      id: 'orders', 
      label: 'Quản lý đơn hàng', 
      icon: FiFileText,
      highlights: ['Tạo/đồng bộ đơn', 'Trạng thái', 'Đổi trả']
    },
    { 
      id: 'shipping', 
      label: 'Vận chuyển, thanh toán', 
      icon: FiTruck,
      highlights: ['Kết nối vận chuyển', 'COD/Online', 'Đối soát phí']
    },
    { 
      id: 'promotions', 
      label: 'Quản lý khuyến mãi', 
      icon: FiPercent,
      highlights: ['Mã giảm giá', 'Combo & Flash sale', 'Upsell']
    },
    { 
      id: 'finance', 
      label: 'Sổ quỹ, thu chi', 
      icon: FiDollarSign,
      highlights: ['Dòng tiền', 'Theo kênh/chiến dịch', 'Báo cáo lợi nhuận']
    },
    { 
      id: 'csi', 
      label: 'CSI (Đo hài lòng)', 
      icon: FiStar,
      highlights: ['Độ hài lòng', 'Tỷ lệ giải quyết', 'Tốc độ phản hồi']
    },
    { 
      id: 'kpi', 
      label: 'Công thức & KPI', 
      icon: FiBookOpen,
      highlights: ['CSAT & NPS', 'Chỉ số giải quyết', 'KPI kinh doanh']
    },
  ]), [])

  const [active, setActive] = useState('intro')
  const [expandedId, setExpandedId] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { root: null, rootMargin: '-160px 0px -40% 0px', threshold: [0.2, 0.4, 0.6, 0.8] }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const handleNavClick = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 96
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
  const [reiText, setReiText] = useState('-0.2, 0.6, 0.3, -0.1')
  const [dtText, setDtText] = useState('3600, 7200, 86400, 172800')
  const [nmsgInput, setNmsgInput] = useState(120)
  const [ngapInput, setNgapInput] = useState(2)
  const [lambdaVal, setLambdaVal] = useState(0.3)
  const [alphaVal, setAlphaVal] = useState(0.5)
  const [betaVal, setBetaVal] = useState(1e-6)

  const parseNumbers = (s) => (s || '').split(/[\s,]+/).map((v) => parseFloat(v)).filter((n) => !Number.isNaN(n))
  const reiArr = useMemo(() => parseNumbers(reiText), [reiText])
  const dtArr = useMemo(() => parseNumbers(dtText), [dtText])
  const neCalc = Math.min(reiArr.length, dtArr.length)
  const wArr = useMemo(() => dtArr.slice(0, neCalc).map((d) => Math.exp(-betaVal * d)), [dtArr, neCalc, betaVal])
  const numerator = useMemo(() => reiArr.slice(0, neCalc).reduce((acc, r, i) => acc + r * wArr[i], 0), [reiArr, neCalc, wArr])
  const nbar = Math.max(0, nmsgInput - neCalc)
  const denom = useMemo(() => wArr.reduce((a, b) => a + b, 0) + lambdaVal * (nbar + alphaVal * ngapInput), [wArr, lambdaVal, nbar, alphaVal, ngapInput])
  const csiEmoRaw = denom > 0 ? numerator / denom : 0
  const csiEmo = Math.max(-1, Math.min(1, csiEmoRaw))
  const interp = (x) => {
    if (x >= 0.7) return 'Rất hài lòng'
    if (x >= 0.3) return 'Hài lòng'
    if (x >= -0.3) return 'Trung lập'
    if (x >= -0.7) return 'Không hài lòng'
    return 'Rất không hài lòng'
  }
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <section ref={containerRef} className="relative py-24 px-4 lg:py-32 overflow-hidden" id="solutions">
      {/* Floating Icons Background */}
      <FloatingIcons />
      
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
            Giải pháp & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Tính năng</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Khám phá bộ giải pháp toàn diện giúp doanh nghiệp tối ưu hóa trải nghiệm khách hàng và vận hành hiệu quả
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-8 lg:gap-12 relative z-10">
        {/* Sidebar Navigation */}
        <div className="lg:sticky lg:top-24 h-max mb-8 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-4 shadow-2xl"
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
                        setExpandedId(isExpanded ? null : s.id)
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
                      
                      <div className="flex items-center gap-3 px-4 py-4">
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-400' 
                            : 'bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`flex-1 text-left text-sm font-medium transition-colors ${
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
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
                  <FiMessageSquare className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Giới thiệu</h3>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                TLL Omnichannel giúp hợp nhất các kênh <span className="text-cyan-400 font-semibold">(Facebook, Telegram, Gmail, Zalo, Website chat)</span> vào một inbox, tích hợp AI để tự động phản hồi và tối ưu vận hành.
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
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-purple-400/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30">
                  <FiCpu className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">TLL Intelligence</h3>
              </div>
              <div className="space-y-5">
                {[
                  { title: 'RAG trả lời ngữ cảnh', desc: 'theo tri thức doanh nghiệp' },
                  { title: 'STT cho voice messages', desc: '(Google Speech-to-Text)' },
                  { title: 'Gửi tin nhắn định lịch', desc: 'theo chiến dịch' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <FiCheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-semibold">{item.title}</div>
                      <div className="text-white/60 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trải nghiệm mua hàng đa kênh */}
          <motion.div 
            id="omni-experience" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-emerald-400/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-500/20 border border-emerald-400/30">
                  <FiShoppingCart className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Trải nghiệm mua hàng đa kênh</h3>
              </div>
              <div className="space-y-5">
                {[
                  'Kết nối Facebook, Telegram, Gmail, Zalo, Web chat',
                  'Đồng bộ hội thoại về một luồng thống nhất',
                  'Phân công, SLA, gợi ý trả lời thông minh'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <FiCheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
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
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-blue-400/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/20 to-indigo-500/20 border border-blue-400/30">
                  <FiGrid className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Quản lý đa kênh tập trung</h3>
              </div>
              <div className="space-y-5">
                {[
                  'Nhật ký khách hàng, nhãn/nhóm, ghi chú',
                  'Mẫu tin nhắn nhanh, kịch bản bot theo giờ',
                  'Báo cáo theo kênh/nhân viên'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <FiCheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Compact Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { id: 'product', icon: FiBox, title: 'Quản lý sản phẩm', desc: 'SKU, thuộc tính, biến thể; đồng bộ tồn kho theo kênh.', color: 'amber' },
              { id: 'inventory', icon: FiPackage, title: 'Quản lý kho', desc: 'Nhập/xuất/chuyển kho, cảnh báo tồn, định mức.', color: 'orange' },
              { id: 'orders', icon: FiFileText, title: 'Quản lý đơn hàng', desc: 'Tạo/đồng bộ đơn, trạng thái, đổi trả, ghi chú nội bộ.', color: 'rose' },
              { id: 'shipping', icon: FiTruck, title: 'Vận chuyển, thanh toán', desc: 'Kết nối hãng vận chuyển, COD/online, đối soát phí.', color: 'violet' },
              { id: 'promotions', icon: FiPercent, title: 'Quản lý khuyến mãi', desc: 'Mã giảm, combo, flash sale; phân khúc & gợi ý upsell.', color: 'pink' },
              { id: 'finance', icon: FiDollarSign, title: 'Sổ quỹ, thu chi', desc: 'Dòng tiền theo kênh/chiến dịch; báo cáo lợi nhuận gộp.', color: 'green' }
            ].map((card, idx) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.id}
                  id={card.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 lg:p-8 hover:border-white/40 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${card.color}-500/10 to-${card.color}-600/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-2.5 rounded-lg bg-gradient-to-br from-${card.color}-400/20 to-${card.color}-500/20 border border-${card.color}-400/30`}>
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

          {/* CSI Section - Enhanced */}
          <motion.div 
            id="csi" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-yellow-400/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30">
                  <FiStar className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">CSI – Customer Satisfaction Index</h3>
                  <p className="text-white/60 text-sm">Điểm tổng hợp từ 3 yếu tố: CSAT, Tỷ lệ giải quyết, Tốc độ phản hồi</p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Controls */}
                <div className="flex-1 space-y-8">
                  {/* CSAT Slider */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-400/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-semibold">Độ hài lòng khách hàng</span>
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
                      <span className="text-white font-semibold">Tỷ lệ giải quyết</span>
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
                      <span className="text-white font-semibold">Tốc độ phản hồi</span>
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

                  {/* Formula Display */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                    <div className="text-white/80 mb-3">
                      <BlockMath math={'CSI = 0.5\\times CSAT + 0.3\\times Resolution + 0.2\\times Speed'} />
                    </div>
                    <div className="text-white/60 font-mono text-sm bg-white/5 p-3 rounded-lg">
                      Ví dụ: 0.5×{csat} + 0.3×{resolution} + 0.2×{speed} = <span className="text-yellow-400 font-bold text-lg">{csi}</span>
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
                          <div className="text-xs uppercase tracking-widest text-white/60 font-semibold">Điểm CSI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggle Advanced Button */}
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={()=>setShowAdvanced((v)=>!v)} 
                  className="group/btn px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white hover:border-yellow-400/50 hover:from-yellow-400/10 hover:to-orange-500/10 transition-all duration-300 flex items-center gap-2"
                >
                  <FiChevronRight className={`w-4 h-4 transition-transform duration-300 ${showAdvanced ? 'rotate-90' : ''}`} />
                  {showAdvanced ? 'Ẩn chi tiết công thức' : 'Xem chi tiết công thức'}
                </button>
              </div>

              {/* Advanced Section */}
              {showAdvanced && (
            <div className="mt-10 grid lg:grid-cols-2 gap-8">
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h4 className="text-xl font-semibold text-white mb-3">CSI theo cảm xúc và thời gian</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Danh sách r_i (cường độ cảm xúc, [-1..1], cách nhau bởi dấu phẩy)</label>
                    <textarea value={reiText} onChange={(e)=>setReiText(e.target.value)} rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none" placeholder="-0.2, 0.6, 0.3, -0.1" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">Danh sách Δt_i (giây từ tin nhắn tới hiện tại)</label>
                    <textarea value={dtText} onChange={(e)=>setDtText(e.target.value)} rows={4} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none" placeholder="3600, 7200, 86400, 172800" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">n_msg (tổng tin nhắn)</label>
                    <input type="number" value={nmsgInput} onChange={(e)=>setNmsgInput(parseInt(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">n_gap (khoảng trống lớn)</label>
                    <input type="number" value={ngapInput} onChange={(e)=>setNgapInput(parseInt(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                  <div className="text-xs text-white/60 flex items-end">ne tính từ độ dài ngắn hơn của 2 danh sách</div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-xs text-white/60 mb-1">λ (lambda)</label>
                    <input type="number" step="0.1" value={lambdaVal} onChange={(e)=>setLambdaVal(parseFloat(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">α (alpha)</label>
                    <input type="number" step="0.1" value={alphaVal} onChange={(e)=>setAlphaVal(parseFloat(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/60 mb-1">β (beta)</label>
                    <input type="number" step="0.000001" value={betaVal} onChange={(e)=>setBetaVal(parseFloat(e.target.value||'0'))} className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white outline-none" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-white/60">
                  <span className="mr-3">ne = {neCalc}</span>
                  <span className="mr-3">n̄e = {Math.max(0, nmsgInput - neCalc)}</span>
                </div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-6 flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <div className="relative w-44 h-44 mx-auto">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: `conic-gradient(#22d3ee ${((csiEmo+1)/2)*360}deg, rgba(255,255,255,0.08) 0)` }}
                    />
                    <div className="absolute inset-3 rounded-full bg-[#0a1128] flex items-center justify-center border border-white/10">
                      <div>
                        <div className="text-3xl font-black text-white">{csiEmo.toFixed(2)}</div>
                        <div className="text-xs uppercase tracking-wide text-white/60">CSI (emo)</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-white/80">Mức: <span className="font-semibold">{interp(csiEmo)}</span></div>
                </div>
              </div>
            </div>
            )}
            {/* CSI detailed formula */}
            {showAdvanced && (
            <div className="mt-10 grid lg:grid-cols-2 gap-8">
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h4 className="text-xl font-semibold text-white mb-3">Chi tiết công thức CSI (Cảm xúc + trọng số thời gian)</h4>
                <ul className="list-disc list-inside text-white/80 space-y-1 mb-4">
                  <li>Số tin nhắn khách hàng trong 1 tháng <span className="font-mono">n_msg</span></li>
                  <li>Khoảng cách giữa các tin nhắn theo giây (để tính <span className="font-mono">Δt</span>)</li>
                  <li>Số tin nhắn có cảm xúc tiêu cực/căng thẳng trong 1 tháng <span className="font-mono">n_e</span></li>
                  <li>Số tin nhắn không gán nhãn cảm xúc <span className="font-mono">n̄_e</span> (<span className="font-mono">n̄_e + n_e = n_msg</span>)</li>
                  <li>Tập cảm xúc khách hàng <span className="font-mono">n_emotion</span>, mỗi giá trị trong khoảng <span className="font-mono">[-1, 1]</span></li>
                </ul>
                <div className="rounded-lg bg-[#0b1533] border border-white/10 p-4 overflow-x-auto">
                  <div className="text-white">
                    <BlockMath math={'CSI = \\frac{\\sum_{i=1}^{n_e} (r_i \\cdot w_{t_i})}{\\sum_{i=1}^{n_e} w_{t_i} + \\lambda \\cdot (\\bar{n}_e + \\alpha \\cdot n_{gap})}'} />
                    <div className="mt-3">
                      <BlockMath math={'w_{t_i} = e^{-\\beta \\cdot \\Delta t_i}'} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-white/80 text-sm">
                  <div>• <span className="font-mono">rᵢ</span>: cường độ cảm xúc của tin nhắn i, <span className="font-mono">rᵢ ∈ [-1,1]</span></div>
                  <div>• <span className="font-mono">wᵢ</span>: trọng số thời gian ưu tiên tin nhắn gần đây, <span className="font-mono">wᵢ = e^(−β·Δtᵢ)</span>, <span className="font-mono">Δtᵢ</span>: giây từ tin nhắn i đến hiện tại</div>
                  <div>• <span className="font-mono">n_e</span>: số tin nhắn có cảm xúc</div>
                  <div>• <span className="font-mono">n̄_e</span>: số tin nhắn không có cảm xúc, <span className="font-mono">n̄_e = n_msg − n_e</span></div>
                  <div>• <span className="font-mono">n_gap</span>: số khoảng trống lớn giữa các tin nhắn (<span className="font-mono">Δt &gt; T_threshold</span>, ví dụ 1 ngày = 86400s)</div>
                  <div>• <span className="font-mono">λ, α, β</span>: hệ số hiệu chỉnh (khuyến nghị: <span className="font-mono">λ=0.3</span>, <span className="font-mono">α=0.5</span>, <span className="font-mono">β=1e−6</span>)</div>
                </div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h4 className="text-xl font-semibold text-white mb-3">Bảng diễn giải thực tế của CSI</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-white/80 border-separate" style={{borderSpacing: 0}}>
                    <thead>
                      <tr className="text-white">
                        <th className="border-b border-white/20 py-2 px-3">Khoảng CSI</th>
                        <th className="border-b border-white/20 py-2 px-3">Mức độ hài lòng</th>
                        <th className="border-b border-white/20 py-2 px-3">Diễn giải</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b border-white/10 py-2 px-3">[0.7, 1.0]</td>
                        <td className="border-b border-white/10 py-2 px-3">Rất hài lòng</td>
                        <td className="border-b border-white/10 py-2 px-3">Cảm xúc rất tích cực, tương tác gần đây chủ động, có khả năng giới thiệu.</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/10 py-2 px-3">[0.3, 0.7)</td>
                        <td className="border-b border-white/10 py-2 px-3">Hài lòng</td>
                        <td className="border-b border-white/10 py-2 px-3">Tích cực chiếm ưu thế, ít phàn nàn, khách ổn định.</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/10 py-2 px-3">[−0.3, 0.3)</td>
                        <td className="border-b border-white/10 py-2 px-3">Trung lập</td>
                        <td className="border-b border-white/10 py-2 px-3">Cảm xúc pha trộn/yếu, tương tác thấp hoặc phản hồi cân bằng.</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/10 py-2 px-3">[−0.7, −0.3)</td>
                        <td className="border-b border-white/10 py-2 px-3">Không hài lòng</td>
                        <td className="border-b border-white/10 py-2 px-3">Tiêu cực chiếm ưu thế, nguy cơ rời bỏ sớm, cần can thiệp.</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">[−1.0, −0.7)</td>
                        <td className="py-2 px-3">Rất không hài lòng</td>
                        <td className="py-2 px-3">Tiêu cực mạnh, rủi ro rời bỏ cao, có thể để lại đánh giá xấu.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            )}
            </div>
          </motion.div>

          {/* KPI Section - Enhanced */}
          <motion.div 
            id="kpi" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
            className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 lg:p-10 hover:border-indigo-400/50 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-400/20 to-purple-500/20 border border-indigo-400/30">
                  <FiBookOpen className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Công thức & KPI</h3>
                  <p className="text-white/60 text-sm">Các chỉ số đo lường hiệu quả kinh doanh và vận hành</p>
                </div>
              </div>

              {/* KPI Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[
                  { 
                    title: 'Độ hài lòng khách hàng', 
                    formula: 'CSAT = (Số phản hồi Hài lòng / Tổng phản hồi) × 100%',
                    color: 'cyan'
                  },
                  { 
                    title: 'Chỉ số khuyến nghị', 
                    formula: 'NPS = ((% Người ủng hộ − % Người phản đối)) × 100%',
                    note: 'Ủng hộ: 9–10, Trung lập: 7–8, Phản đối: 0–6',
                    color: 'blue'
                  },
                  { 
                    title: 'Tỷ lệ giải quyết', 
                    formula: 'TL = (Số yêu cầu đã giải quyết / Tổng yêu cầu) × 100%',
                    color: 'emerald'
                  },
                  { 
                    title: 'Thời gian phản hồi đầu tiên', 
                    formula: 'TGPĐ = Tổng thời gian phản hồi đầu tiên / Số hội thoại',
                    color: 'violet'
                  },
                  { 
                    title: 'Thời gian xử lý trung bình', 
                    formula: 'TGXL = (Nói chuyện + Chờ + Kết thúc) / Số tương tác',
                    color: 'purple'
                  },
                  { 
                    title: 'Đạt cam kết dịch vụ', 
                    formula: 'SLA% = (Số phản hồi đúng hạn / Tổng phản hồi) × 100%',
                    color: 'pink'
                  },
                  { 
                    title: 'Tỷ lệ chuyển đổi', 
                    formula: 'TL = (Số đơn hàng / Số khách hàng tiềm năng) × 100%',
                    color: 'orange'
                  },
                  { 
                    title: 'Tỷ lệ giữ chân khách hàng', 
                    formula: 'Giữ chân = (KH cuối kỳ − KH mới) / KH đầu kỳ × 100%',
                    color: 'amber'
                  },
                  { 
                    title: 'Giá trị trọn đời khách hàng', 
                    formula: 'GTTĐ = Doanh thu TB × Biên lợi nhuận × Thời gian gắn bó',
                    color: 'green'
                  }
                ].map((kpi, idx) => (
                  <motion.div
                    key={kpi.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="group/kpi relative rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 hover:border-white/30 hover:from-white/15 hover:to-white/10 transition-all duration-300"
                  >
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${kpi.color}-500/20 to-${kpi.color}-600/10 rounded-full blur-2xl opacity-0 group-hover/kpi:opacity-100 transition-opacity duration-300`} />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-2 h-2 rounded-full bg-${kpi.color}-400`} />
                        <h4 className="font-bold text-white text-lg">{kpi.title}</h4>
                      </div>
                      <div className="font-mono text-sm text-white/70 leading-relaxed mb-3">
                        {kpi.formula}
                      </div>
                      {kpi.note && (
                        <div className="text-xs text-white/50 mt-2 pt-2 border-t border-white/10">
                          {kpi.note}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Solutions
