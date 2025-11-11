import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaFacebook, FaTelegram, FaEnvelope, FaGlobe, FaInstagram } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'

const OmniChannel = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const channels = [
    {
      name: 'Facebook Messenger',
      icon: <FaFacebook className="w-8 h-8" />,
      color: '#1877F2',
      features: ['Page Inbox', 'Webhook Events', 'Template Messages']
    },
    {
      name: 'Telegram',
      icon: <FaTelegram className="w-8 h-8" />,
      color: '#2AABEE',
      features: ['Bot API', 'File/Voice Support', 'Reply Markup']
    },
    {
      name: 'Gmail (Email)',
      icon: <FaEnvelope className="w-8 h-8" />,
      color: '#EA4335',
      features: ['Inbound/Outbound', 'Threading', 'Attachments']
    },
    {
      name: 'Zalo OA',
      icon: <SiZalo className="w-8 h-8" />,
      color: '#0068FF',
      features: ['Official Account', 'Webhook', 'Templates']
    },
    {
      name: 'Website Chat',
      icon: <FaGlobe className="w-8 h-8" />,
      color: '#10B981',
      features: ['Embed Widget', 'Real-time', 'Branding']
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-8 h-8" />,
      color: '#E4405F',
      features: ['Graph API', 'Direct Messages', 'Stories']
    },
  ]

  return (
    <section ref={ref} className="relative py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Omnichannel Integration
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Connect Facebook, Telegram, Gmail, Zalo, and Website Chat into one unified inbox. 
            Automate responses, route by skills, manage SLAs, and sync knowledge base like OmniAI.
          </p>
        </motion.div>

        {/* Channels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {channels.map((channel, idx) => (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
              style={{
                boxShadow: `0 10px 30px ${channel.color}15`
              }}
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${channel.color}dd, ${channel.color}99)`,
                  }}
                >
                  {channel.icon}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {channel.name}
                </h3>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {channel.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      color: channel.color,
                      borderColor: channel.color,
                      background: `${channel.color}15`
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unified Inbox Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-dashed border-white/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Unified Inbox + AI Intelligence
          </h3>
          <p className="text-white/70 max-w-3xl mx-auto">
            Consolidate all conversations from multiple channels into one unified stream. 
            Combine multi-source RAG for accurate context-based responses, keyword/after-hours scenarios, 
            and assign to the right agent.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default OmniChannel
