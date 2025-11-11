# 🚀 Quick Start Guide

## Cài đặt và chạy dự án

### 1. Cài đặt dependencies

```bash
cd /Volumes/KING/DOAN/Landing-page
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại: **http://localhost:3002**

### 3. Build cho production

```bash
npm run build
```

File build sẽ được tạo trong folder `dist/`

---

## 📋 Checklist

- [x] Package.json với Vite + React + Tailwind
- [x] Tailwind CSS configuration
- [x] Hero section với 3D isometric icons
- [x] AI Features section
- [x] Omnichannel Integration section
- [x] Management Features section
- [x] Pricing section
- [x] Footer với links và social media
- [x] Responsive design (mobile, tablet, desktop)
- [x] Smooth animations với Framer Motion
- [x] Dark theme với gradient effects

---

## 🎨 Design Features

### Hero Section
- ✅ TLL OMNIAI branding với gradient text
- ✅ 6 animated social platform icons (Facebook, Telegram, Gmail, Zalo, Website, Instagram)
- ✅ Central AI hub với floating animation
- ✅ Stats counter (6+ Channels, 2,500+ Users, 99.9% Uptime, 24/7 Support)
- ✅ CTA buttons (Start Free Trial, Watch Demo)

### AI Features
- ✅ 4 core features: Unified Inbox, AI Auto-Reply, Voice-to-Text, Scheduled Messages
- ✅ Additional features list với checkmarks
- ✅ Card hover effects

### Omnichannel
- ✅ 6 platform integrations với icons và features
- ✅ Unified inbox banner
- ✅ Color-coded cards theo từng platform

### Management
- ✅ Team Collaboration, Analytics, Knowledge Base, Security
- ✅ 2-column grid layout
- ✅ Icon-based presentation

### Pricing
- ✅ 3 pricing tiers: Starter ($49), Professional ($149), Enterprise (Custom)
- ✅ Highlighted "Most Popular" plan
- ✅ Feature comparison lists

---

## 🛠️ Customization Tips

### Thay đổi màu sắc
Edit `tailwind.config.js`:
```js
colors: {
  primary: { 500: '#YOUR_COLOR' },
  purple: { 500: '#YOUR_COLOR' }
}
```

### Thay đổi nội dung
- Hero: `src/components/Hero.jsx`
- Features: `src/components/AIFeatures.jsx`
- Channels: `src/components/OmniChannel.jsx`
- Pricing: `src/components/Pricing.jsx`

### Thêm animations
Sử dụng Framer Motion:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Your content
</motion.div>
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Tất cả components đã được optimize cho mobile-first design.

---

## 🎯 Next Steps

1. **Install dependencies**: `npm install`
2. **Run dev server**: `npm run dev`
3. **Customize content** trong các component files
4. **Test responsive** trên các devices
5. **Build for production**: `npm run build`
6. **Deploy** lên Vercel/Netlify

---

## ⚠️ CSS Warnings

Các warnings về `@tailwind` và `@apply` trong `index.css` là bình thường với Tailwind CSS. 
IDE có thể hiển thị warnings nhưng code sẽ chạy hoàn toàn bình thường khi build.

---

## 📞 Support

Nếu gặp vấn đề, check:
1. Node.js version >= 16
2. npm version >= 8
3. Đã chạy `npm install` thành công
4. Port 3002 chưa bị sử dụng

Happy coding! 🎉
