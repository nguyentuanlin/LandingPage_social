import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Sản phẩm': [
      { name: 'Tính năng', href: '#features' },
      { name: 'Bảng giá', href: '#pricing' },
      { name: 'Tích hợp', href: '#omnichannel' },
      { name: 'Tài liệu API', href: '#' },
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
    <footer className="relative pt-20 pb-10 px-4 border-t border-white/10">
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-black text-gradient mb-4">
              TLL OMNIAI
            </h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Nền tảng tương tác khách hàng đa kênh thông minh. 
              Hợp nhất cuộc hội thoại, tự động hóa với AI và làm hài lòng khách hàng của bạn.
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
              <h4 className="text-white font-bold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-white/60 text-sm">
              © {currentYear} TLL OmniAI. Bảo lưu mọi quyền.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
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
