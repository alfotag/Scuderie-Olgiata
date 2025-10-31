'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { HiCheckCircle, HiArrowLeft, HiArrowRight } from 'react-icons/hi'

interface FairyTaleContractProps {
  onSubmit: (formData: FormData) => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  codiceFiscale: string
  indirizzo: string
  citta: string
  cap: string
  numberOfHorses: string
  moveInDate: string
  subscriptionType: string
  otherServices: string
  accettaContratto: boolean
}

export default function FairyTaleContract({ onSubmit }: FairyTaleContractProps) {
  const [currentPage, setCurrentPage] = useState(1) // 1 = dati, 2 = contratto
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    codiceFiscale: '',
    indirizzo: '',
    citta: '',
    cap: '',
    numberOfHorses: '',
    moveInDate: '',
    subscriptionType: '',
    otherServices: '',
    accettaContratto: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.accettaContratto) {
      alert('Devi accettare il contratto di affiliazione per procedere')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/affiliazione', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.firstName,
          cognome: formData.lastName,
          email: formData.email,
          telefono: formData.phone,
          codiceFiscale: formData.codiceFiscale,
          indirizzo: formData.indirizzo,
          citta: formData.citta,
          cap: formData.cap,
          piano: formData.subscriptionType || 'Non specificato',
          accettaContratto: formData.accettaContratto,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        onSubmit(formData)
      } else {
        alert(data.error || 'Errore durante l\'invio del modulo')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Errore durante l\'invio del modulo. Riprova.')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const validatePage1 = () => {
    return formData.firstName && formData.lastName && formData.email &&
           formData.phone && formData.codiceFiscale && formData.indirizzo &&
           formData.citta && formData.cap
  }

  const handleNextPage = () => {
    if (currentPage === 1 && validatePage1()) {
      setCurrentPage(2)
    }
  }

  const handlePrevPage = () => {
    if (currentPage === 2) {
      setCurrentPage(1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateZ: -2 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ duration: 1, type: 'spring' }}
      className="relative max-w-3xl mx-auto w-full my-8"
    >
      {/* Pergamena esterna con bordi irregolari */}
      <div
        className="relative bg-[#F4E4C1] rounded-lg shadow-2xl"
        style={{
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))',
        }}
      >
        {/* Texture pergamena */}
        <div
          className="absolute inset-0 opacity-30 rounded-lg"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23F5E6D3' surfaceScale='1'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper)' opacity='0.25'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />

        {/* Bordo dorato esterno */}
        <div className="absolute inset-0 rounded-lg border-8 border-[#8B6914] opacity-60" />
        <div className="absolute inset-2 rounded-lg border-4 border-[#D4AF37] opacity-80" />
        <div className="absolute inset-3 rounded-lg border-2 border-[#FFD700] opacity-40" />

        {/* Decorazioni angolari stile medievale */}
        {[
          { className: 'top-4 left-4', rotation: 0 },
          { className: 'top-4 right-4', rotation: 90 },
          { className: 'bottom-4 left-4', rotation: 270 },
          { className: 'bottom-4 right-4', rotation: 180 }
        ].map((corner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className={`absolute ${corner.className} z-10`}
            style={{ transform: `rotate(${corner.rotation}deg)` }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              {/* Decorazione floreale medievale */}
              <path
                d="M 10 10 Q 15 10 20 15 Q 25 20 25 30 Q 25 20 30 15 Q 35 10 45 10"
                stroke="#8B4513"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M 10 10 Q 10 15 15 20 Q 20 25 30 25 Q 20 25 15 30 Q 10 35 10 45"
                stroke="#8B4513"
                strokeWidth="2.5"
                fill="none"
              />
              <circle cx="30" cy="30" r="4" fill="#D4AF37" />
              <circle cx="15" cy="15" r="3" fill="#FFD700" />
            </svg>
          </motion.div>
        ))}

        {/* Contenuto della pergamena */}
        <div className="relative z-5 p-6 md:p-8">
          {/* Sigillo di cera in alto - ridotto */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-red-700 to-red-900 border-3 border-red-950 shadow-xl flex items-center justify-center"
          >
            <div className="w-9 h-9 rounded-full border-2 border-red-200/30 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 30 30" className="text-red-200">
                {/* Logo cavallo stilizzato */}
                <path
                  d="M 15 5 Q 12 8 10 12 L 8 16 Q 7 20 10 22 L 15 25 L 20 22 Q 23 20 22 16 L 20 12 Q 18 8 15 5 M 15 5 L 15 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>

          {/* Titolo del contratto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-4"
          >
            <h2
              className="text-2xl md:text-3xl font-light mb-1"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#2C1810',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Contratto di Affiliazione
            </h2>
            <p
              className="text-base md:text-lg font-light mb-2"
              style={{
                fontFamily: 'Georgia, serif',
                color: '#8B4513'
              }}
            >
              Scuderie Olgiata
            </p>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#8B4513]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#8B4513]" />
            </div>
          </motion.div>

          {/* Testo introduttivo in stile medievale */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-4 text-center px-2"
          >
            <p
              className="text-sm md:text-base leading-relaxed italic mb-2"
              style={{
                fontFamily: 'Georgia, serif',
                color: '#3E2723'
              }}
            >
              Con la presente pergamena, dichiari la tua volontà di <strong>diventare affiliato</strong> al circolo
              delle Scuderie Olgiata. Compila i campi e suggella questo patto di appartenenza.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4"
          >
            {/* Nome e Cognome in riga */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#5D4037'
                  }}
                >
                  Nome *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#2C1810'
                  }}
                  placeholder="Il tuo nome"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#5D4037'
                  }}
                >
                  Cognome *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#2C1810'
                  }}
                  placeholder="Il tuo cognome"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#5D4037'
                }}
              >
                Indirizzo Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#2C1810'
                }}
                placeholder="la.tua.email@esempio.it"
              />
            </div>

            {/* Telefono */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#5D4037'
                }}
              >
                Numero di Telefono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#2C1810'
                }}
                placeholder="+39 xxx xxx xxxx"
              />
            </div>

            {/* Codice Fiscale */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#5D4037'
                }}
              >
                Codice Fiscale *
              </label>
              <input
                type="text"
                name="codiceFiscale"
                value={formData.codiceFiscale}
                onChange={handleChange}
                required
                maxLength={16}
                className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all uppercase"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#2C1810'
                }}
                placeholder="RSSMRA80A01H501U"
              />
            </div>

            {/* Indirizzo */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#5D4037'
                }}
              >
                Indirizzo di Residenza *
              </label>
              <input
                type="text"
                name="indirizzo"
                value={formData.indirizzo}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#2C1810'
                }}
                placeholder="Via Roma 123"
              />
            </div>

            {/* Città e CAP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#5D4037'
                  }}
                >
                  Città *
                </label>
                <input
                  type="text"
                  name="citta"
                  value={formData.citta}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#2C1810'
                  }}
                  placeholder="Roma"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#5D4037'
                  }}
                >
                  CAP *
                </label>
                <input
                  type="text"
                  name="cap"
                  value={formData.cap}
                  onChange={handleChange}
                  required
                  maxLength={5}
                  className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#2C1810'
                  }}
                  placeholder="00100"
                />
              </div>
            </div>

            {/* Separatore decorativo */}
            <div className="flex items-center gap-3 py-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8B4513]/30" />
              <span className="text-[10px] text-[#8B4513] uppercase tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>
                Info aggiuntive (opzionali)
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8B4513]/30" />
            </div>

            {/* Quanti cavalli porterai */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#5D4037'
                  }}
                >
                  Quanti cavalli hai?
                </label>
                <select
                  name="numberOfHorses"
                  value={formData.numberOfHorses}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#2C1810'
                  }}
                >
                  <option value="">Seleziona...</option>
                  <option value="1">1 cavallo</option>
                  <option value="2">2 cavalli</option>
                  <option value="3">3 cavalli</option>
                  <option value="4">4 cavalli</option>
                  <option value="5+">5 o più cavalli</option>
                  <option value="nessuno">Ancora non ho cavalli</option>
                </select>
              </div>

              {/* Quando ti sposterai */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#5D4037'
                  }}
                >
                  Quando vorresti iniziare?
                </label>
                <select
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: '#2C1810'
                  }}
                >
                  <option value="">Seleziona...</option>
                  <option value="immediately">Immediatamente</option>
                  <option value="1-month">Entro 1 mese</option>
                  <option value="2-3-months">Entro 2-3 mesi</option>
                  <option value="3-6-months">Entro 3-6 mesi</option>
                  <option value="6-12-months">Entro 6-12 mesi</option>
                  <option value="not-sure">Non sono ancora sicuro</option>
                </select>
              </div>
            </div>

            {/* Tipo di abbonamento */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#5D4037'
                }}
              >
                Che tipo di servizio ti interessa?
              </label>
              <select
                name="subscriptionType"
                value={formData.subscriptionType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#2C1810'
                }}
              >
                <option value="">Seleziona un'opzione...</option>
                <option value="box-vuoto">Box Vuoto - €330/mese</option>
                <option value="tutto-incluso">Tutto Incluso - €780/mese</option>
                <option value="altri-servizi">Sono interessato ad altri servizi</option>
                <option value="solo-affiliazione">Solo affiliazione al circolo</option>
                <option value="non-deciso">Non ho ancora deciso</option>
              </select>
            </div>

            {/* Altri servizi */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#5D4037'
                }}
              >
                Sei interessato ad altri servizi?
              </label>
              <textarea
                name="otherServices"
                value={formData.otherServices}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all resize-none text-sm"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#2C1810'
                }}
                placeholder="Es: lezioni, servizi veterinari, allenamento..."
              />
            </div>

            {/* Linea decorativa */}
            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8B4513]/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8B4513]/30" />
            </div>

            {/* Sezione Contratto di Affiliazione */}
            <div className="bg-[#FFF8E7] border-4 border-[#8B6914] rounded-xl p-6 space-y-4">
              <h3
                className="text-lg md:text-xl font-light text-center mb-4"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: '#2C1810'
                }}
              >
                📜 Contratto di Affiliazione
              </h3>

              {/* Download Contratto */}
              <div className="bg-white/50 border-2 border-[#D4AF37] rounded-lg p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#8B6914]/10 rounded-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base" style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}>
                        Contratto di Affiliazione
                      </p>
                      <p className="text-xs" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
                        Leggi attentamente prima di firmare
                      </p>
                    </div>
                  </div>
                  <a
                    href="/documents/contratto-affiliazione.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#8B4513] to-[#5D4037] text-[#FFF8E7] rounded-lg border-2 border-[#D4AF37] hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span className="text-sm" style={{ fontFamily: 'Georgia, serif' }}>Scarica PDF</span>
                  </a>
                </div>
              </div>

              {/* Checkbox Accettazione */}
              <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-lg hover:bg-white/30 transition-all">
                <div className="relative flex items-center justify-center mt-1">
                  <input
                    type="checkbox"
                    name="accettaContratto"
                    checked={formData.accettaContratto}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 rounded border-3 border-[#8B6914] text-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
                  />
                  {formData.accettaContratto && (
                    <HiCheckCircle className="absolute w-6 h-6 text-[#D4AF37] pointer-events-none" />
                  )}
                </div>
                <span className="text-sm leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#3E2723' }}>
                  <strong>Dichiaro solennemente</strong> di aver letto e di <strong>accettare integralmente</strong> i termini e le condizioni del{' '}
                  <a
                    href="/documents/contratto-affiliazione.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8B4513] font-semibold underline decoration-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    Contratto di Affiliazione
                  </a>
                  . Confermo che i dati forniti sono <strong>veritieri e completi</strong>. *
                </span>
              </label>

              {/* Nota Legale sulla Firma Elettronica */}
              <div className="bg-gradient-to-br from-blue-50 to-amber-50 border-2 border-[#8B6914]/30 rounded-lg p-4">
                <p className="text-xs leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#3E2723' }}>
                  <strong className="text-[#8B4513]">⚖️ Nota sulla Firma Elettronica:</strong> Accettando questo contratto tramite checkbox,
                  verrà registrata una <strong>Firma Elettronica Semplice (FES)</strong> ai sensi del Regolamento eIDAS.
                  Verranno conservati: <strong>indirizzo IP, timestamp</strong>, e tutti i dati forniti.
                  Riceverai una <strong>copia del contratto via email</strong> per tua documentazione.
                </p>
              </div>
            </div>

            {/* Pulsante di invio stile sigillo */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !formData.accettaContratto}
              whileHover={{ scale: formData.accettaContratto ? 1.02 : 1, y: formData.accettaContratto ? -2 : 0 }}
              whileTap={{ scale: formData.accettaContratto ? 0.98 : 1 }}
              className="w-full relative group"
            >
              <div className={`relative px-8 py-4 rounded-xl border-4 shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                formData.accettaContratto
                  ? 'bg-gradient-to-br from-[#8B4513] to-[#5D4037] text-[#FFF8E7] border-[#D4AF37] hover:shadow-2xl cursor-pointer'
                  : 'bg-gray-400 text-gray-200 border-gray-500 cursor-not-allowed opacity-50'
              }`}>
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-[#FFF8E7]/30 border-t-[#FFF8E7] rounded-full animate-spin" />
                    <span className="text-xl font-light" style={{ fontFamily: 'Georgia, serif' }}>
                      Sigillando il contratto...
                    </span>
                  </div>
                ) : (
                  <>
                    <HiCheckCircle className={`w-6 h-6 ${formData.accettaContratto ? 'text-[#D4AF37]' : 'text-gray-300'}`} />
                    <span className="text-xl font-light" style={{ fontFamily: 'Georgia, serif' }}>
                      Firma il Contratto
                    </span>
                  </>
                )}
              </div>
              {/* Effetto glow - solo se checkbox è spuntata */}
              {formData.accettaContratto && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              )}
            </motion.button>

            <p
              className="text-xs text-center mt-4 italic"
              style={{
                fontFamily: 'Georgia, serif',
                color: '#5D4037'
              }}
            >
              * I campi contrassegnati con asterisco sono obbligatori.<br />
              I tuoi dati saranno trattati con la massima riservatezza e utilizzati esclusivamente per l'affiliazione.
            </p>
          </motion.form>

          {/* Decorazione finale */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
          />
        </div>
      </div>

      {/* Ombre multiple per effetto 3D */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-orange-900/20 blur-lg -z-10 transform translate-y-2" />
      <div className="absolute inset-0 bg-black/20 blur-xl -z-20 transform translate-y-4" />
    </motion.div>
  )
}
