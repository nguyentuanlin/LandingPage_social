import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'

const Navbar = ({ theme = 'dark', onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: 'Giải pháp', href: '#solutions' },
    { name: 'Bảng giá', href: '#pricing' },
    { name: 'Khách hàng', href: '#omnichannel' },
    { name: 'Enterprise', href: '#management' },
    { name: 'Thêm', href: '#site-footer' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="container mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-14 md:h-16">

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white/85 hover:text-white transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors"
                aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              >
                {theme === 'dark' ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              </button>
            )}
            <a
              href="#login"
              className="px-5 py-1.5 rounded-full bg-white/10 ring-1 ring-white/15 text-white/85 hover:text-white backdrop-blur-sm transition-colors text-sm font-medium"
            >
              Đăng nhập
            </a>
            <a
              href="#signup"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1ee0e0] to-[#2df5b3] text-[#0a1128] font-semibold text-sm hover:opacity-90 transition-all shadow-md"
            >
              Đăng ký
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  <a
                    href="#login"
                    className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                  >
                    Đăng nhập
                  </a>
                  <a
                    href="#signup"
                    className="px-6 py-2 rounded-full bg-[#1ee0e0] text-[#0a1128] font-bold text-sm hover:bg-[#1ee0e0]/90 transition-all text-center"
                  >
                    Đăng ký
                  </a>
                </div>
                {onToggleTheme && (
                  <button
                    type="button"
                    onClick={onToggleTheme}
                    className="ml-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors"
                    aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
                  >
                    {theme === 'dark' ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
