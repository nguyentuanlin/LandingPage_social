import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Navbar from './Navbar'

const Hero = () => {
  const containerRef = useRef(null)
  const mvx = useMotionValue(0)
  const mvy = useMotionValue(0)
  const rotateX = useTransform(mvy, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mvx, [-0.5, 0.5], [-10, 10])

  const onMove = (e) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    mvx.set(x)
    mvy.set(y)
  }
  const onLeave = () => { mvx.set(0); mvy.set(0) }
  return (
    <>
    <Navbar />
    <section id="hero" className="relative h-screen w-screen overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0a1128 0%, #1a2847 50%, #0f1b3a 100%)'
    }}>
      

      <div className="relative h-full w-full" ref={containerRef} onMouseMove={onMove} onMouseLeave={onLeave}>
        {/* Hero Image: full-bleed cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{ perspective: '2000px' }}
        >
          {/* Backdrop: blurred cover to fill edges */}
          <motion.img
            src="/img/anhnet.jpeg"
            alt="TLL OMNIAI"
            className="absolute inset-0 w-full h-full object-cover select-none blur-[8px] sm:blur-[10px] saturate-110 opacity-90"
            style={{ objectPosition: '50% 45%' }}
            draggable={false}
            decoding="async"
            loading="eager"
            initial={{ scale: 1.06, x: 0, y: 0 }}
            animate={{ scale: 1.12, x: 8, y: -6 }}
            transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
          {/* Foreground: crisp central image, no upscaling beyond native */}
          <motion.div className="absolute inset-0 flex items-center justify-center" style={{ rotateX, rotateY, willChange: 'transform' }}
            animate={{ y: [0, -3, 0], scale: [1, 1.005, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/img/anhnet.jpeg"
              alt="TLL OMNIAI"
              className="w-auto h-auto max-w-[min(92vw,1600px)] max-h-[80vh] object-contain select-none drop-shadow-[0_40px_80px_rgba(59,130,246,0.25)]"
              decoding="async"
              loading="eager"
              draggable={false}
            />
          </motion.div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0a1128]/8 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(10,17,40,0) 55%, rgba(10,17,40,0.55) 100%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(10,17,40,0.25) 0%, rgba(10,17,40,0) 22%, rgba(10,17,40,0) 78%, rgba(10,17,40,0.25) 100%)' }} />
          <div className="absolute inset-0 pointer-events-none">
            <motion.span className="absolute w-1.5 h-1.5 rounded-full bg-white/80" style={{ left: '12%', top: '22%' }} animate={{ opacity: [0.3,1,0.3], y: [0,-6,0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.span className="absolute w-1 h-1 rounded-full bg-white/70" style={{ left: '28%', top: '18%' }} animate={{ opacity: [0.2,1,0.2], y: [0,-4,0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} />
            <motion.span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/80" style={{ left: '45%', top: '15%' }} animate={{ opacity: [0.3,1,0.3], y: [0,-5,0] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} />
            <motion.span className="absolute w-1 h-1 rounded-full bg-white/70" style={{ left: '62%', top: '20%' }} animate={{ opacity: [0.2,1,0.2], y: [0,-4,0] }} transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }} />
            <motion.span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-200/80" style={{ left: '76%', top: '28%' }} animate={{ opacity: [0.3,1,0.3], y: [0,-6,0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />
            <motion.span className="absolute w-1 h-1 rounded-full bg-white/70" style={{ left: '20%', top: '68%' }} animate={{ opacity: [0.2,1,0.2], y: [0,-4,0] }} transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
            <motion.span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/80" style={{ left: '48%', top: '74%' }} animate={{ opacity: [0.3,1,0.3], y: [0,-5,0] }} transition={{ duration: 3.7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }} />
            <motion.span className="absolute w-1 h-1 rounded-full bg-white/70" style={{ left: '70%', top: '66%' }} animate={{ opacity: [0.2,1,0.2], y: [0,-4,0] }} transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }} />
          </div>
        </motion.div>
      </div>
    </section>
    </>
  )
}

export default Hero
