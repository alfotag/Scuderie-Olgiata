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
  subscriptionType: string
  accettaContratto: boolean
}

export default function FairyTaleContractPages({ onSubmit }: FairyTaleContractProps) {
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
    subscriptionType: 'Box Vuoto - €330/mese',
    accettaContratto: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (validatePage1()) {
      setCurrentPage(2)
    } else {
      alert('Per favore compila tutti i campi obbligatori')
    }
  }

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
          piano: formData.subscriptionType,
          accettaContratto: formData.accettaContratto,
        }),
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const data = await response.json()
        console.error('Response not OK:', data)
        alert(data.error || 'Errore durante l\'invio del modulo')
        setIsSubmitting(false)
        return
      }

      const data = await response.json()
      console.log('Response data:', data)

      if (data.success) {
        console.log('Success! Calling onSubmit')
        try {
          onSubmit(formData as any)
          console.log('onSubmit completed successfully')
        } catch (onSubmitError) {
          console.error('Error in onSubmit callback:', onSubmitError)
          alert('Affiliazione completata ma errore nella navigazione. Ricarica la pagina.')
          setIsSubmitting(false)
        }
      } else {
        console.error('Success field is false:', data)
        alert(data.message || 'Errore durante l\'invio del modulo')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Errore durante l\'invio del modulo. Riprova.')
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateZ: -2 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ duration: 1, type: 'spring' }}
      className="relative max-w-xl mx-auto w-full scale-90 md:scale-95"
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

        {/* Decorazioni angolari */}
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
            <svg width="50" height="50" viewBox="0 0 60 60">
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

        {/* Sigillo di cera in alto */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-red-700 to-red-900 border-3 border-red-950 shadow-xl flex items-center justify-center z-20"
        >
          <div className="w-8 h-8 rounded-full border-2 border-red-200/30 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 30 30" className="text-red-200">
              <path
                d="M 15 5 Q 12 8 10 12 L 8 16 Q 7 20 10 22 L 15 25 L 20 22 Q 23 20 22 16 L 20 12 Q 18 8 15 5 M 15 5 L 15 12"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>

        {/* Contenuto della pergamena */}
        <div className="relative z-5 p-3 md:p-4">
          {/* Titolo del contratto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-2"
          >
            <h2
              className="text-lg md:text-xl font-light mb-1"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#2C1810',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Contratto di Affiliazione
            </h2>
            <p
              className="text-sm md:text-base font-light mb-2"
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

          {/* Indicatore pagina */}
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2].map((page) => (
              <div
                key={page}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === page ? 'bg-[#D4AF37] w-6' : 'bg-[#8B6914]/30'
                }`}
              />
            ))}
          </div>

          {/* Contenuto Pagine con Animazione */}
          <AnimatePresence mode="wait">
            {currentPage === 1 ? (
              // PAGINA 1: Dati Personali
              <motion.div
                key="page1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-2 text-center px-2"
                >
                  <p
                    className="text-xs md:text-sm leading-snug italic mb-1"
                    style={{
                      fontFamily: 'Georgia, serif',
                      color: '#3E2723'
                    }}
                  >
                    Con la presente pergamena, dichiari la tua volontà di <strong>diventare affiliato</strong> al circolo
                    delle Scuderie Olgiata. Compila i campi e suggella questo patto di appartenenza.
                  </p>
                </motion.div>

                {/* Nome e Cognome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                      style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
                      Cognome *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                      style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}
                      placeholder="Il tuo cognome"
                    />
                  </div>
                </div>

                {/* Email e Telefono */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                      style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}
                      placeholder="email@esempio.it"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                      style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}
                      placeholder="+39 xxx xxx xxxx"
                    />
                  </div>
                </div>

                {/* Codice Fiscale */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
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
                    style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}
                    placeholder="RSSMRA80A01H501U"
                  />
                </div>

                {/* Indirizzo */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
                    Indirizzo di Residenza *
                  </label>
                  <input
                    type="text"
                    name="indirizzo"
                    value={formData.indirizzo}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                    style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}
                    placeholder="Via Roma 123"
                  />
                </div>

                {/* Città e CAP */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
                      Città *
                    </label>
                    <input
                      type="text"
                      name="citta"
                      value={formData.citta}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                      style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}
                      placeholder="Roma"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
                      CAP *
                    </label>
                    <input
                      type="text"
                      name="cap"
                      value={formData.cap}
                      onChange={handleChange}
                      required
                      maxLength={5}
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                      style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}
                      placeholder="00100"
                    />
                  </div>
                </div>

                {/* Tipo di abbonamento */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'Georgia, serif', color: '#5D4037' }}>
                    Che tipo di servizio ti interessa? *
                  </label>
                  <select
                    name="subscriptionType"
                    value={formData.subscriptionType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#FFF8E7] border-2 border-[#8B6914] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 transition-all"
                    style={{ fontFamily: 'Georgia, serif', color: '#2C1810' }}
                  >
                    <option value="Box Vuoto - €330/mese">Box Vuoto - €330/mese</option>
                    <option value="Tutto Incluso - €780/mese">Tutto Incluso - €780/mese</option>
                    <option value="Bronze - €149/mese">Bronze - €149/mese</option>
                    <option value="Silver - €299/mese">Silver - €299/mese</option>
                    <option value="Gold - €599/mese">Gold - €599/mese</option>
                    <option value="Altri servizi">Sono interessato ad altri servizi</option>
                    <option value="Solo affiliazione">Solo affiliazione al circolo</option>
                  </select>
                </div>

                {/* Linea decorativa */}
                <div className="flex items-center gap-3 py-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8B4513]/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8B4513]/30" />
                </div>

                {/* Bottone Avanti */}
                <motion.button
                  type="button"
                  onClick={handleNextPage}
                  disabled={!validatePage1()}
                  whileHover={{ scale: validatePage1() ? 1.02 : 1, y: validatePage1() ? -2 : 0 }}
                  whileTap={{ scale: validatePage1() ? 0.98 : 1 }}
                  className="w-full relative group"
                >
                  <div className={`relative px-6 py-2.5 rounded-xl border-3 shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    validatePage1()
                      ? 'bg-gradient-to-br from-[#8B4513] to-[#5D4037] text-[#FFF8E7] border-[#D4AF37] hover:shadow-2xl cursor-pointer'
                      : 'bg-gray-400 text-gray-200 border-gray-500 cursor-not-allowed opacity-50'
                  }`}>
                    <span className="text-base font-light" style={{ fontFamily: 'Georgia, serif' }}>
                      Avanti
                    </span>
                    <HiArrowRight className={`w-5 h-5 ${validatePage1() ? 'text-[#D4AF37]' : 'text-gray-300'}`} />
                  </div>
                  {validatePage1() && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  )}
                </motion.button>
              </motion.div>
            ) : (
              // PAGINA 2: Contratto da Firmare
              <motion.div
                key="page2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <form onSubmit={handleSubmit} className="space-y-2">
                  {/* Sezione Contratto */}
                  <div className="bg-[#FFF8E7] border-3 border-[#8B6914] rounded-xl p-3 space-y-2">
                    <h3
                      className="text-base md:text-lg font-light text-center mb-2"
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: '#2C1810'
                      }}
                    >
                      📜 Contratto di Affiliazione
                    </h3>

                    {/* Download Contratto */}
                    <div className="bg-white/50 border-2 border-[#D4AF37] rounded-lg p-2">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
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
                    <label className="flex items-start gap-2 cursor-pointer group p-2 rounded-lg hover:bg-white/30 transition-all">
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
                    <div className="bg-gradient-to-br from-blue-50 to-amber-50 border-2 border-[#8B6914]/30 rounded-lg p-2">
                      <p className="text-xs leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#3E2723' }}>
                        <strong className="text-[#8B4513]">⚖️ Nota sulla Firma Elettronica:</strong> Accettando questo contratto tramite checkbox,
                        verrà registrata una <strong>Firma Elettronica Semplice (FES)</strong> ai sensi del Regolamento eIDAS.
                        Verranno conservati: <strong>indirizzo IP, timestamp</strong>, e tutti i dati forniti.
                        Riceverai una <strong>copia del contratto via email</strong> per tua documentazione.
                      </p>
                    </div>
                  </div>

                  {/* Linea decorativa */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8B4513]/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8B4513]/30" />
                  </div>

                  {/* Bottoni Indietro e Firma */}
                  <div className="flex gap-2">
                    {/* Bottone Indietro */}
                    <motion.button
                      type="button"
                      onClick={() => setCurrentPage(1)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 relative group"
                    >
                      <div className="relative px-5 py-2.5 rounded-xl border-3 border-[#8B6914] bg-white/50 text-[#8B4513] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                        <HiArrowLeft className="w-5 h-5" />
                        <span className="text-base font-light" style={{ fontFamily: 'Georgia, serif' }}>
                          Indietro
                        </span>
                      </div>
                    </motion.button>

                    {/* Bottone Firma */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.accettaContratto}
                      whileHover={{ scale: formData.accettaContratto ? 1.02 : 1, y: formData.accettaContratto ? -2 : 0 }}
                      whileTap={{ scale: formData.accettaContratto ? 0.98 : 1 }}
                      className="flex-1 relative group"
                    >
                      <div className={`relative px-5 py-2.5 rounded-xl border-3 shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                        formData.accettaContratto && !isSubmitting
                          ? 'bg-gradient-to-br from-[#8B4513] to-[#5D4037] text-[#FFF8E7] border-[#D4AF37] hover:shadow-2xl cursor-pointer'
                          : 'bg-gray-400 text-gray-200 border-gray-500 cursor-not-allowed opacity-50'
                      }`}>
                        {isSubmitting ? (
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-[#FFF8E7]/30 border-t-[#FFF8E7] rounded-full animate-spin" />
                            <span className="text-base font-light" style={{ fontFamily: 'Georgia, serif' }}>
                              Sigillando...
                            </span>
                          </div>
                        ) : (
                          <>
                            <HiCheckCircle className={`w-5 h-5 ${formData.accettaContratto ? 'text-[#D4AF37]' : 'text-gray-300'}`} />
                            <span className="text-base font-light" style={{ fontFamily: 'Georgia, serif' }}>
                              Firma il Contratto
                            </span>
                          </>
                        )}
                      </div>
                      {formData.accettaContratto && !isSubmitting && (
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

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
