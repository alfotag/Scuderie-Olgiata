import type { Metadata } from 'next'
import { Poppins, Nunito } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Scuderie Olgiata - Un Viaggio nell\'Eccellenza Equestre',
  description: 'Un\'esperienza cinematografica e rivoluzionaria. Scopri il club equestre più esclusivo di Roma attraverso un viaggio immersivo nell\'eccellenza.',
  keywords: ['equitazione', 'scuderia', 'Roma', 'club equestre', 'pensione cavalli', 'lezioni equitazione', 'lusso'],
  authors: [{ name: 'Scuderie Olgiata' }],
  openGraph: {
    title: 'Scuderie Olgiata - Un Viaggio nell\'Eccellenza',
    description: 'Vivi un\'esperienza immersiva e rivoluzionaria nel mondo dell\'equitazione d\'élite',
    type: 'website',
    locale: 'it_IT',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${poppins.variable} ${nunito.variable}`}>
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
