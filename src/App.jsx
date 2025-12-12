import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import Hero from './components/Hero'
import AIFeatures from './components/AIFeatures'
import Solutions from './components/Solutions'
import OmniChannel from './components/OmniChannel'
import Management from './components/Management'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import ConsultationWidget from './components/ConsultationWidget'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Khởi tạo theme từ localStorage hoặc system preference
    try {
      const saved = window.localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved)
        return
      }
    } catch (e) {
      // ignore
    }

    if (window.matchMedia) {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
      setTheme(prefersLight ? 'light' : 'dark')
    } else {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    // Áp dụng theme lên thẻ html để CSS có thể override
    const root = document.documentElement
    root.dataset.theme = theme
    try {
      window.localStorage.setItem('theme', theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0

      // Hiện nút scroll-to-top sớm hơn để dễ thấy hơn
      setShowScrollTop(scrollTop > 200)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Hero theme={theme} onToggleTheme={toggleTheme} />
        <AIFeatures theme={theme} />
        <Solutions theme={theme} />
        <OmniChannel theme={theme} />
        <Management theme={theme} />
        <Pricing theme={theme} />
        <Footer theme={theme} />
      </div>

      {/* Consultation Popup Widget */}
      <ConsultationWidget theme={theme} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-24 z-40 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
