import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaRocket, FaCheckCircle, FaPlay, FaFacebook, FaTelegram, FaEnvelope, FaInstagram, FaWhatsapp, FaGoogle, FaTiktok, FaLine } from 'react-icons/fa'
import { SiZalo, SiShopee } from 'react-icons/si'
import Navbar from './Navbar'

const IconCard = ({ Icon, color, name, size = 'md', theme = 'dark', imgSrc }) => {
  const w = size === 'lg' ? 'w-24 h-24' : 'w-20 h-20'
  const iconSize = size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
  const backgroundColor = theme === 'light' ? 'rgba(255,255,255,0.96)' : `${color}12`
  const boxShadow =
    theme === 'light'
      ? '0 18px 45px rgba(15,23,42,0.06)'
      : `0 18px 55px ${color}35`

  const glowBackground =
    theme === 'light'
      ? 'radial-gradient(circle at 50% 50%, rgba(148,163,184,0.18), transparent 60%)'
      : `radial-gradient(circle at 50% 50%, ${color}33, transparent 60%)`

  return (
    <div className="relative group">
      <motion.div
        className="absolute -inset-3 rounded-3xl blur-2xl opacity-80"
        style={{ background: glowBackground }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className={`${w} relative rounded-2xl border border-white/25 backdrop-blur-2xl flex flex-col items-center justify-center shadow-2xl`}
        style={{ backgroundColor, boxShadow }}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={name}
            className={`${iconSize} object-contain`}
          />
        ) : (
          <Icon className={`${iconSize}`} style={{ color }} />
        )}
        <span className="text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-1">
          {name}
        </span>
      </div>
    </div>
  )
}

const ChannelPanel = ({ theme }) => {
  const [rx, setRx] = useState(0)
  const [ry, setRy] = useState(0)
  const [gx, setGx] = useState(50)
  const [gy, setGy] = useState(50)
  const channels = [
    { Icon: FaFacebook, color: '#1877F2', name: 'Facebook' },
    { Icon: FaInstagram, color: '#E4405F', name: 'Instagram' },
    { Icon: FaTelegram, color: '#2AABEE', name: 'Telegram' },
    { Icon: FaEnvelope, color: '#EA4335', name: 'Gmail' },
    { Icon: SiZalo, color: '#0068FF', name: 'Zalo', imgSrc: '/img/zalo-logo.png' },
    { Icon: FaWhatsapp, color: '#25D366', name: 'WhatsApp' },
  ]
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const px = x / r.width
    const py = y / r.height
    setRy((px - 0.5) * 14)
    setRx((0.5 - py) * 14)
    setGx(px * 100)
    setGy(py * 100)
  }
  const onLeave = () => { setRx(0); setRy(0) }
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)` ,
          backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.96)' : undefined,
          boxShadow:
            theme === 'light'
              ? '0 24px 60px rgba(15,23,42,0.08)'
              : '0 40px 120px rgba(0,0,0,0.35)'
        }}
        className="relative w-[460px] max-w-[92vw] rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
      >
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              theme === 'light'
                ? `radial-gradient(600px at ${gx}% ${gy}%, rgba(148,163,184,0.16), transparent 60%)`
                : `radial-gradient(600px at ${gx}% ${gy}%, rgba(59,130,246,0.18), transparent 60%)`
          }}
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="text-white/70 text-sm font-medium">Tích hợp kênh</div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {channels.map((c) => (
              <motion.div
                key={c.name}
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="p-4 rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md text-center"
                style={{
                  boxShadow:
                    theme === 'light'
                      ? '0 18px 45px rgba(15,23,42,0.06)'
                      : `0 12px 40px ${c.color}25`,
                  backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.96)' : undefined
                }}
              >
                <IconCard Icon={c.Icon} color={c.color} name={c.name} size="md" theme={theme} imgSrc={c.imgSrc} />
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center text-white/60 text-xs">Facebook, Instagram, Telegram, Gmail, Zalo, WhatsApp</div>
        </div>
      </motion.div>
    </div>
  )
}

const Hero = ({ theme, onToggleTheme }) => {
  return (
    <>
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a1128] via-[#0f1b3a] to-[#1a2847]">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl"
          />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 backdrop-blur-sm"
              >
                <FaRocket className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-400">Nền tảng AI Omnichannel #1 Việt Nam</span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
                >
                  <span className="text-white">Kết nối mọi</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    kênh tương tác
                  </span>
                  <br />
                  <span className="text-white">với khách hàng</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl hero-description"
                >
                  Hợp nhất Facebook, Telegram, Gmail, Zalo vào một hộp thư thống nhất. 
                  Tự động hóa với AI, tăng hiệu suất 10x và nâng cao trải nghiệm khách hàng.
                </motion.p>
              </div>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                {[
                  'Tích hợp đa kênh trong 5 phút',
                  'AI tự động trả lời 24/7',
                  'Tăng tỷ lệ chuyển đổi 300%'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                      <FaCheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-white/90 font-medium hero-bullet-text">{feature}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="https://smile.cmcu.edu.vn/landing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Dùng thử miễn phí 14 ngày
                  <FaRocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="group px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <FaPlay className="w-4 h-4" />
                  Xem Demo
                </button>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="pt-8 border-t border-white/10"
              >
                <p className="text-white/50 text-sm mb-4">Được tin dùng bởi 500+ doanh nghiệp</p>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-[#0a1128] flex items-center justify-center text-white font-bold text-sm">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <span className="text-white/70 font-semibold">4.9/5.0</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Floating Apps Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <ChannelPanel theme={theme} />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-sm">Cuộn xuống để khám phá</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default Hero
