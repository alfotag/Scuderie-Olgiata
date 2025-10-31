'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import AffiliationForm from '@/components/forms/AffiliationForm'
import { FileText } from 'lucide-react'

export default function AffilazionePage() {
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
              <FileText className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Processo semplice e sicuro</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Completa la Tua
              <span className="block bg-gradient-to-r from-secondary to-secondary-light bg-clip-text text-transparent">
                Affiliazione
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Compila il modulo e accetta il contratto per unirti alla famiglia delle Scuderie Olgiata
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12">Caricamento...</div>}>
            <AffiliationForm />
          </Suspense>
        </div>
      </section>

      {/* Security Info */}
      <section className="py-12 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-semibold text-text-primary mb-2">Dati Protetti</h4>
              <p className="text-sm text-text-secondary">
                Le tue informazioni sono al sicuro
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📧</div>
              <h4 className="font-semibold text-text-primary mb-2">Conferma via Email</h4>
              <p className="text-sm text-text-secondary">
                Riceverai una copia del contratto
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-text-primary mb-2">Processo Rapido</h4>
              <p className="text-sm text-text-secondary">
                Attivazione immediata dell'affiliazione
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
