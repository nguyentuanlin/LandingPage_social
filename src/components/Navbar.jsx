import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'

const Navbar = ({ theme = 'dark', onToggleTheme, language = 'vi', onChangeLanguage }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isLight = theme === 'light'

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
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b ${
        isLight ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-slate-950/80 border-white/10'
      }`}
    >
      <div className="container mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="#hero"
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                  <img
                    src="/img/logoTLL.png"
                    alt="TLL Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <span
                className={`hidden sm:inline text-base font-semibold tracking-wide ${
                  isLight ? 'text-slate-900' : 'text-white/95'
                }`}
              >
                TLL OmniAI
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    isLight
                      ? 'text-slate-700 hover:text-slate-900'
                      : 'text-white/85 hover:text-white'
                  } transition-colors text-sm font-medium`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Buttons + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
                  isLight
                    ? 'bg-white text-slate-900 border-slate-200 hover:bg-slate-100'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
                aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              >
                {theme === 'dark' ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
              </button>
            )}
            <div
              className={`flex items-center rounded-full overflow-hidden text-xs border ${
                isLight ? 'bg-slate-100 border-slate-300' : 'bg-white/5 border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => onChangeLanguage && onChangeLanguage('vi')}
                className={`px-3 py-1.5 font-medium transition-colors ${
                  language === 'vi'
                    ? 'bg-white text-slate-900'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => onChangeLanguage && onChangeLanguage('en')}
                className={`px-3 py-1.5 font-medium transition-colors border-l ${
                  language === 'en'
                    ? 'bg-white text-slate-900 border-transparent'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 border-slate-300'
                    : 'text-white/80 hover:text-white border-white/10'
                }`}
              >
                EN
              </button>
            </div>
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
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center rounded-full overflow-hidden text-xs border ${
                      isLight ? 'bg-slate-100 border-slate-300' : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onChangeLanguage && onChangeLanguage('vi')}
                      className={`px-3 py-1.5 font-medium transition-colors ${
                        language === 'vi'
                          ? 'bg-white text-slate-900'
                          : isLight
                          ? 'text-slate-600 hover:text-slate-900'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      VI
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangeLanguage && onChangeLanguage('en')}
                      className={`px-3 py-1.5 font-medium transition-colors border-l ${
                        language === 'en'
                          ? 'bg-white text-slate-900 border-transparent'
                          : isLight
                          ? 'text-slate-600 hover:text-slate-900 border-slate-300'
                          : 'text-white/80 hover:text-white border-white/10'
                      }`}
                    >
                      EN
                    </button>
                  </div>
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
