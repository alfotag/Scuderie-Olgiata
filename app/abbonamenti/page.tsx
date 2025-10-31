'use client'

import { motion } from 'framer-motion'
import PricingCard from '@/components/ui/PricingCard'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

const pricingPlans = [
  {
    name: 'Bronze',
    price: '€149',
    description: 'Perfetto per iniziare',
    features: [
      { text: 'Accesso base alle strutture', included: true },
      { text: '2 lezioni di equitazione al mese', included: true },
      { text: 'Sconto 10% su servizi aggiuntivi', included: true },
      { text: 'Accesso agli eventi sociali', included: true },
      { text: 'Accesso al campo padel (previa prenotazione)', included: true },
      { text: 'Accesso wellness center', included: false },
      { text: 'Box cavallo incluso', included: false },
      { text: 'Lezioni private illimitate', included: false },
    ],
  },
  {
    name: 'Silver',
    price: '€299',
    description: 'Il più popolare',
    badge: 'Consigliato',
    highlighted: true,
    features: [
      { text: 'Tutto di Bronze +', included: true },
      { text: '4 lezioni di equitazione al mese', included: true },
      { text: 'Accesso wellness center e SPA', included: true },
      { text: 'Sconto 20% su eventi e competizioni', included: true },
      { text: 'Priorità nelle prenotazioni', included: true },
      { text: 'Accesso lounge VIP', included: true },
      { text: 'Box cavallo incluso', included: false },
      { text: 'Lezioni private illimitate', included: false },
    ],
  },
  {
    name: 'Gold',
    price: '€599',
    description: 'L\'esperienza completa',
    features: [
      { text: 'Tutto di Silver +', included: true },
      { text: 'Lezioni di equitazione illimitate', included: true },
      { text: 'Box cavallo comfort incluso', included: true },
      { text: 'Accesso VIP a tutti gli eventi', included: true },
      { text: 'Sconto 30% su tutti i servizi', included: true },
      { text: 'Personal trainer dedicato', included: true },
      { text: 'Programma nutrizionale personalizzato per il cavallo', included: true },
      { text: 'Consulenza veterinaria mensile gratuita', included: true },
    ],
  },
]

export default function AbbonamentiPage() {
  const router = useRouter()

  const handlePlanSelect = (planName: string) => {
    router.push(`/affiliazione?piano=${planName}`)
  }

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Piani flessibili per ogni esigenza</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Scegli il Tuo
              <span className="block bg-gradient-to-r from-secondary to-secondary-light bg-clip-text text-transparent">
                Abbonamento Perfetto
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Offriamo piani di abbonamento flessibili per soddisfare ogni livello di esperienza e passione equestre
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                highlighted={plan.highlighted}
                badge={plan.badge}
                ctaText="Inizia Ora"
                index={index}
                onCTAClick={() => handlePlanSelect(plan.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Tutti i Piani Includono
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-xl bg-background">
                <div className="text-3xl mb-3">🎁</div>
                <h4 className="font-semibold text-text-primary mb-2">Prima Visita Gratuita</h4>
                <p className="text-sm text-text-secondary">
                  Vieni a conoscerci senza impegno
                </p>
              </div>
              <div className="p-6 rounded-xl bg-background">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="font-semibold text-text-primary mb-2">Nessun Vincolo</h4>
                <p className="text-sm text-text-secondary">
                  Disdici quando vuoi, senza penali
                </p>
              </div>
              <div className="p-6 rounded-xl bg-background">
                <div className="text-3xl mb-3">💳</div>
                <h4 className="font-semibold text-text-primary mb-2">Pagamenti Flessibili</h4>
                <p className="text-sm text-text-secondary">
                  Mensili, trimestrali o annuali
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Domande Frequenti
          </h3>
          <div className="space-y-4">
            {[
              {
                q: 'Posso cambiare piano in qualsiasi momento?',
                a: 'Sì, puoi passare a un piano superiore in qualsiasi momento. Il costo verrà ricalcolato in proporzione.',
              },
              {
                q: 'Cosa succede se non utilizzo tutte le lezioni del mese?',
                a: 'Le lezioni non utilizzate possono essere recuperate nel mese successivo (massimo 2 lezioni cumulative).',
              },
              {
                q: 'È possibile acquistare lezioni aggiuntive?',
                a: 'Certamente! I membri hanno accesso a tariffe scontate per lezioni aggiuntive.',
              },
              {
                q: 'Ci sono costi di iscrizione?',
                a: 'La quota di iscrizione una tantum è di €50, che include il kit di benvenuto e la tessera associativa.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-surface border border-gray-200"
              >
                <h4 className="font-semibold text-text-primary mb-2">{faq.q}</h4>
                <p className="text-text-secondary">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
