'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  name: string
  price: string
  period?: string
  description: string
  features: PricingFeature[]
  highlighted?: boolean
  ctaText?: string
  onCTAClick?: () => void
  badge?: string
  index: number
}

export default function PricingCard({
  name,
  price,
  period = '/mese',
  description,
  features,
  highlighted = false,
  ctaText = 'Scegli Piano',
  onCTAClick,
  badge,
  index,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn('relative', highlighted && 'lg:-mt-4')}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-secondary to-secondary-light text-white text-sm font-semibold shadow-lg">
            <Star className="w-4 h-4 fill-white" />
            {badge}
          </div>
        </div>
      )}

      <Card
        hoverable
        className={cn(
          'h-full',
          highlighted && 'border-2 border-secondary shadow-2xl sm:scale-105'
        )}
      >
        {/* Header */}
        <div className="text-center pb-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-text-primary mb-2">{name}</h3>
          <p className="text-text-secondary mb-4">{description}</p>
          <div className="flex items-end justify-center gap-1">
            <span className="text-4xl sm:text-5xl font-bold text-primary">{price}</span>
            <span className="text-text-secondary mb-2 text-sm sm:text-base">{period}</span>
          </div>
        </div>

        {/* Features */}
        <div className="py-6 space-y-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className={cn(
                'flex items-start gap-3',
                !feature.included && 'opacity-50'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                  feature.included
                    ? 'bg-success/10 text-success'
                    : 'bg-gray-200 text-gray-400'
                )}
              >
                <Check className="w-3 h-3" />
              </div>
              <span
                className={cn(
                  'text-sm',
                  feature.included ? 'text-text-primary' : 'text-text-secondary'
                )}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-6 border-t border-gray-200">
          <Button
            variant={highlighted ? 'gold' : 'primary'}
            size="lg"
            className="w-full"
            onClick={onCTAClick}
          >
            {ctaText}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
