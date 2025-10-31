import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  club: [
    { name: 'Chi Siamo', href: '/club' },
    { name: 'La Nostra Storia', href: '/club#storia' },
    { name: 'Il Team', href: '/club#team' },
    { name: 'Certificazioni', href: '/club#certificazioni' },
  ],
  servizi: [
    { name: 'Equitazione', href: '/servizi#equitazione' },
    { name: 'Sport', href: '/servizi#sport' },
    { name: 'Benessere', href: '/servizi#benessere' },
    { name: 'Eventi', href: '/eventi' },
  ],
  info: [
    { name: 'Prenotazioni', href: '/prenotazioni' },
    { name: 'Abbonamenti', href: '/abbonamenti' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contatti', href: '/contatti' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Termini e Condizioni', href: '/termini' },
    { name: 'Cookie Policy', href: '/cookie' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/scuderieolgiata' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/scuderieolgiata' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/scuderieolgiata' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Resta Aggiornato</h3>
              <p className="text-white/80">
                Iscriviti alla newsletter per ricevere news, eventi e offerte esclusive
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-secondary-light text-white font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
                Iscriviti
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center">
                <span className="text-2xl font-bold text-white">SO</span>
              </div>
              <div>
                <div className="text-xl font-bold">Scuderie Olgiata</div>
                <div className="text-sm text-white/70">Roma</div>
              </div>
            </div>
            <p className="text-white/80 mb-4 max-w-sm">
              Dove Passione Equestre ed Eccellenza si Incontrano.
              Un club esclusivo nel cuore di Roma per vivere l'esperienza equestre a 360°.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-secondary" />
                <span>Via Olgiata, 15 - 00123 Roma</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-secondary" />
                <span>+39 06 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-secondary" />
                <span>info@scuderieolgiata.it</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Il Club</h4>
            <ul className="space-y-2">
              {footerLinks.club.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Servizi</h4>
            <ul className="space-y-2">
              {footerLinks.servizi.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Informazioni</h4>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/60">
              © 2024 Scuderie Olgiata. Tutti i diritti riservati.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
