import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

const Pricing = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const plans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for small teams getting started',
      features: [
        '3 Channels',
        '1,000 Messages/month',
        'Basic AI Auto-Reply',
        'Email Support',
        '5 Team Members'
      ],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/month',
      description: 'For growing businesses',
      features: [
        '6+ Channels',
        '10,000 Messages/month',
        'Advanced AI with RAG',
        'Priority Support',
        '20 Team Members',
        'Custom Workflows',
        'Analytics Dashboard'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Unlimited Channels',
        'Unlimited Messages',
        'Custom AI Training',
        'Dedicated Support',
        'Unlimited Team Members',
        'API Access',
        'SLA Guarantee',
        'On-premise Option'
      ],
      highlighted: false
    },
  ]

  return (
    <section id="pricing" ref={ref} className="relative py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include core features.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-blue-500/20 to-purple-500/20 border-blue-500/50 scale-105'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold">
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-white/60 text-sm mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-black text-white">
                  {plan.price}
                </span>
                <span className="text-white/60 text-lg">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-white/80">
                    <FaCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center text-white/60"
        >
          <p>All plans include 14-day free trial. No credit card required.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
