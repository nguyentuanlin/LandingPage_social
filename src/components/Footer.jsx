import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Sản phẩm': [
      { name: 'Tính năng', href: '#features' },
      { name: 'Giải pháp', href: '#solutions' },
      { name: 'Tích hợp đa kênh', href: '#omnichannel' },
      { name: 'Bảng giá', href: '#pricing' },
    ],
    'Công ty': [
      { name: 'Về chúng tôi', href: '#' },
      { name: 'Tuyển dụng', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Bộ báo chí', href: '#' },
    ],
    'Tài nguyên': [
      { name: 'Tài liệu', href: '#' },
      { name: 'Trung tâm trợ giúp', href: '#' },
      { name: 'Cộng đồng', href: '#' },
      { name: 'Liên hệ', href: '#' },
    ],
    'Pháp lý': [
      { name: 'Chính sách bảo mật', href: '#' },
      { name: 'Điều khoản dịch vụ', href: '#' },
      { name: 'Chính sách Cookie', href: '#' },
      { name: 'GDPR', href: '#' },
    ],
  }

  const socialLinks = [
    { icon: <FaFacebook />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
    { icon: <FaGithub />, href: '#', label: 'GitHub' },
  ]

  return (
    <footer id="site-footer" className="relative mt-24 pt-16 pb-10 px-4 border-t border-white/10 bg-gradient-to-b from-transparent via-[#050818] to-[#020414] overflow-hidden">
      {/* Decorative gradient line */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-blue-500/40" />
      {/* Soft glow orbs */}
      <div className="pointer-events-none absolute -top-32 -right-16 w-72 h-72 rounded-full bg-purple-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative container mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl md:text-3xl font-black text-gradient mb-3 tracking-tight">
              TLL OMNIAI
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed text-sm md:text-base">
              Nền tảng tương tác khách hàng đa kênh thông minh.
              Hợp nhất hội thoại, AI trả lời tự động và báo cáo hiệu suất để đội CSKH vận hành gọn nhẹ hơn.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" />
                <span>contact@tll-omniai.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-white/70 hidden sm:inline-block" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/60 text-xs md:text-sm">
              © {currentYear} TLL OmniAI. Bảo lưu mọi quyền.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/5 hover:border-white/30 shadow-sm hover:shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
