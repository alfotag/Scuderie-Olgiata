'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    alert('Messaggio inviato con successo! Ti risponderemo al più presto.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Indirizzo',
      content: 'Via Olgiata, 15',
      subContent: '00123 Roma, Italia',
    },
    {
      icon: Phone,
      title: 'Telefono',
      content: '+39 06 XXX XXXX',
      subContent: 'Lun-Dom 7:00-20:00',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@scuderieolgiata.it',
      subContent: 'Risposta entro 24h',
    },
    {
      icon: Clock,
      title: 'Orari',
      content: 'Lun-Dom: 7:00-20:00',
      subContent: 'Sempre aperti per i membri',
    },
  ]

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Contattaci
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Siamo qui per rispondere a tutte le tue domande. Non esitare a contattarci!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hoverable className="text-center h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">{info.title}</h3>
                    <p className="text-text-primary font-medium">{info.content}</p>
                    <p className="text-sm text-text-secondary mt-1">{info.subContent}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Inviaci un Messaggio
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Nome Completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Mario Rossi"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="mario.rossi@email.com"
                />
                <Input
                  label="Telefono"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+39 XXX XXX XXXX"
                />
                <Input
                  label="Oggetto"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Di cosa vuoi parlare?"
                />
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Messaggio
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-surface text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Scrivi qui il tuo messaggio..."
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  <Send className="mr-2 w-5 h-5" />
                  Invia Messaggio
                </Button>
              </form>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Dove Siamo
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80 lg:h-[500px] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-text-secondary">
                    Mappa interattiva Google Maps
                  </p>
                  <p className="text-sm text-text-tertiary mt-2">
                    Via Olgiata, 15 - 00123 Roma
                  </p>
                </div>
              </div>

              {/* Directions */}
              <div className="mt-8 p-6 rounded-xl bg-background">
                <h3 className="font-semibold text-text-primary mb-3">Come Raggiungerci</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>In auto: Uscita Cassia bis dalla Grande Raccordo Anulare</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>In treno: Stazione La Storta + 10 minuti di taxi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Parcheggio gratuito disponibile per i visitatori</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
