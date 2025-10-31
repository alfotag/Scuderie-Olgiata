'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Check, Loader2, Download } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface FormData {
  nome: string
  cognome: string
  email: string
  telefono: string
  codiceFiscale: string
  indirizzo: string
  citta: string
  cap: string
  piano: string
  accettaContratto: boolean
}

export default function AffiliationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    codiceFiscale: '',
    indirizzo: '',
    citta: '',
    cap: '',
    piano: 'Bronze',
    accettaContratto: false,
  })

  // Pre-seleziona il piano dai query params
  useEffect(() => {
    const piano = searchParams.get('piano')
    if (piano && ['Bronze', 'Silver', 'Gold'].includes(piano)) {
      setFormData(prev => ({ ...prev, piano }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
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
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to success page or show success message
        alert('Affiliazione completata con successo! Riceverai una email di conferma.')
        router.push('/abbonamenti')
      } else {
        alert(data.error || 'Errore durante l\'invio del modulo')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Errore durante l\'invio del modulo. Riprova.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-2xl shadow-lg p-4 sm:p-6 md:p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dati Personali */}
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Dati Personali</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-text-primary mb-2">
                Nome *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Mario"
              />
            </div>
            <div>
              <label htmlFor="cognome" className="block text-sm font-medium text-text-primary mb-2">
                Cognome *
              </label>
              <input
                type="text"
                id="cognome"
                name="cognome"
                required
                value={formData.cognome}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Rossi"
              />
            </div>
          </div>
        </div>

        {/* Contatti */}
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Contatti</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="mario.rossi@email.com"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-text-primary mb-2">
                Telefono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="+39 123 456 7890"
              />
            </div>
          </div>
        </div>

        {/* Codice Fiscale */}
        <div>
          <label htmlFor="codiceFiscale" className="block text-sm font-medium text-text-primary mb-2">
            Codice Fiscale *
          </label>
          <input
            type="text"
            id="codiceFiscale"
            name="codiceFiscale"
            required
            value={formData.codiceFiscale}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="RSSMRA80A01H501U"
            maxLength={16}
          />
        </div>

        {/* Indirizzo */}
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Residenza</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="indirizzo" className="block text-sm font-medium text-text-primary mb-2">
                Indirizzo *
              </label>
              <input
                type="text"
                id="indirizzo"
                name="indirizzo"
                required
                value={formData.indirizzo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Via Roma 123"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="citta" className="block text-sm font-medium text-text-primary mb-2">
                  Città *
                </label>
                <input
                  type="text"
                  id="citta"
                  name="citta"
                  required
                  value={formData.citta}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Roma"
                />
              </div>
              <div>
                <label htmlFor="cap" className="block text-sm font-medium text-text-primary mb-2">
                  CAP *
                </label>
                <input
                  type="text"
                  id="cap"
                  name="cap"
                  required
                  value={formData.cap}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="00100"
                  maxLength={5}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Piano di Abbonamento */}
        <div>
          <label htmlFor="piano" className="block text-sm font-medium text-text-primary mb-2">
            Piano di Abbonamento *
          </label>
          <select
            id="piano"
            name="piano"
            required
            value={formData.piano}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="Bronze">Bronze - €149/mese</option>
            <option value="Silver">Silver - €299/mese</option>
            <option value="Gold">Gold - €599/mese</option>
          </select>
        </div>

        {/* Contratto di Affiliazione */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Contratto di Affiliazione
          </h3>

          {/* Download Contratto */}
          <div className="mb-4 p-3 sm:p-4 bg-background rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-text-primary text-sm sm:text-base">Contratto di Affiliazione</p>
                  <p className="text-xs sm:text-sm text-text-secondary">Scarica e leggi il contratto completo</p>
                </div>
              </div>
              <a
                href="/documents/contratto-affiliazione.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm sm:text-base whitespace-nowrap flex-shrink-0"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Scarica PDF
              </a>
            </div>
          </div>

          {/* Checkbox Accettazione */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                name="accettaContratto"
                checked={formData.accettaContratto}
                onChange={handleChange}
                className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                required
              />
              {formData.accettaContratto && (
                <Check className="w-3 h-3 text-white absolute pointer-events-none" />
              )}
            </div>
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              Dichiaro di aver letto e accetto integralmente i termini e le condizioni del{' '}
              <a
                href="/documents/contratto-affiliazione.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium underline"
              >
                Contratto di Affiliazione
              </a>
              . Confermo che i dati forniti sono veritieri e completi. *
            </span>
          </label>

          {/* Nota Legale */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>Nota sulla Firma Elettronica:</strong> Accettando questo contratto tramite checkbox,
              verrà registrata una Firma Elettronica Semplice (FES) ai sensi del Regolamento eIDAS.
              Verranno conservati: indirizzo IP, timestamp, e tutti i dati forniti. Riceverai una copia
              del contratto via email per tua documentazione.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting || !formData.accettaContratto}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-4 px-8 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Invio in corso...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Conferma Affiliazione
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
