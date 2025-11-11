# TLL OmniAI Landing Page

Modern, responsive landing page for TLL OmniAI - Intelligent Omnichannel Customer Engagement Platform.

## 🚀 Features

- **Modern Design**: Dark theme with gradient effects inspired by Sapo OmniAI
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Smooth animations using Framer Motion
- **Performance**: Built with Vite for fast development and optimized builds
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## 🎨 Design Highlights

- 3D isometric-style social media icons
- Gradient text effects and glowing elements
- Smooth scroll animations
- Interactive hover effects
- Dark background with subtle patterns

## 📦 Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready animation library
- **React Icons**: Popular icon library

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Development

The development server will start at `http://localhost:3002`

## 📁 Project Structure

```
Landing-page/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Hero section with 3D icons
│   │   ├── AIFeatures.jsx    # AI features showcase
│   │   ├── OmniChannel.jsx   # Channel integrations
│   │   ├── Management.jsx    # Management features
│   │   ├── Pricing.jsx       # Pricing plans
│   │   └── Footer.jsx        # Footer with links
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── tailwind.config.js        # Tailwind configuration
```

## 🎯 Key Sections

1. **Hero**: Eye-catching hero with animated 3D social icons and TLL OMNIAI branding
2. **AI Features**: Showcase of intelligent features (Auto-reply, Voice-to-Text, etc.)
3. **Omnichannel**: Integration with 6+ platforms (Facebook, Telegram, Gmail, Zalo, etc.)
4. **Management**: Centralized management features and analytics
5. **Pricing**: Three-tier pricing plans (Starter, Professional, Enterprise)
6. **Footer**: Links, contact info, and social media

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```js
colors: {
  primary: { ... },
  purple: { ... }
}
```

### Content
Update text content in each component file under `src/components/`

### Animations
Modify Framer Motion animations in component files

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

Build the project and deploy the `dist` folder to your hosting service:

```bash
npm run build
```

Compatible with:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📄 License

Copyright © 2024 TLL OmniAI. All rights reserved.

## 🤝 Support

For support, email contact@tll-omniai.com or visit our help center.
