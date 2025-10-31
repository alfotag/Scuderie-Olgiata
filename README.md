# Scuderie Olgiata - Sito Web Premium

Un sito web elegante e moderno per Scuderie Olgiata, club equestre esclusivo nel cuore di Roma.

## Caratteristiche

- **Design Premium**: Interfaccia elegante con palette colori blu royal e oro
- **Responsive**: Ottimizzato per tutti i dispositivi (mobile, tablet, desktop)
- **Animazioni Fluide**: Transizioni e micro-interazioni con Framer Motion
- **Performance Ottimizzate**: Built con Next.js 15 e React 19
- **TypeScript**: Type-safe per maggiore affidabilità
- **Design System**: Componenti riutilizzabili e consistenti

## Stack Tecnologico

- **Framework**: Next.js 15.5 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Animazioni**: Framer Motion
- **Icone**: Lucide React
- **Form**: React Hook Form + Zod
- **Type Safety**: TypeScript
- **UI Components**: Radix UI

## Struttura del Progetto

```
scuderie-olgiata/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Home page
│   ├── abbonamenti/         # Pagina abbonamenti
│   ├── contatti/            # Pagina contatti
│   ├── layout.tsx           # Layout principale
│   └── globals.css          # Stili globali + Tailwind
├── components/
│   ├── home/                # Componenti home page
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── layout/              # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/                  # UI components riutilizzabili
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── PricingCard.tsx
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Asset statici
```

## Pagine Implementate

### 1. Home Page (/)
- Hero section con gradiente e statistiche
- Sezione features con 3 servizi principali
- Testimonials dei membri
- Call-to-action finale

### 2. Abbonamenti (/abbonamenti)
- Pricing table con 3 tier (Bronze, Silver, Gold)
- Dettagli features per ogni piano
- FAQ section
- Informazioni aggiuntive

### 3. Contatti (/contatti)
- Form di contatto funzionale
- Informazioni di contatto (indirizzo, telefono, email, orari)
- Placeholder per mappa Google Maps
- Indicazioni stradali

## Design System

### Colori

```css
/* PRIMARY - Royal Blue */
--color-primary: #2C5F8D
--color-primary-dark: #1A3A5C
--color-primary-light: #4A7FB8

/* SECONDARY - Warm Gold */
--color-secondary: #D4AF37
--color-secondary-dark: #B8941F
--color-secondary-light: #E5C158

/* BACKGROUNDS */
--color-background: #F8F9FA
--color-surface: #FFFFFF

/* TEXT */
--color-text-primary: #1C1C1E
--color-text-secondary: #6C6C70
--color-text-tertiary: #8E8E93
```

### Tipografia

- **Headings**: Poppins (600-800)
- **Body**: Nunito (400-600)

### Border Radius

- Small: 8px
- Medium: 16px
- Large: 24px
- XL: 32px

## Come Iniziare

### Prerequisiti

- Node.js 18+
- npm o yarn

### Installazione

1. Naviga nella directory del progetto:
```bash
cd scuderie-olgiata
```

2. Le dipendenze sono già installate. Per reinstallarle:
```bash
npm install
```

### Sviluppo

Avvia il server di sviluppo:

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

### Build di Produzione

Crea la build ottimizzata:

```bash
npm run build
```

Avvia il server di produzione:

```bash
npm start
```

## Componenti Riutilizzabili

### Button

```tsx
import Button from '@/components/ui/Button'

<Button variant="primary" size="lg">
  Clicca qui
</Button>
```

Varianti: `primary`, `secondary`, `gold`, `outline`, `ghost`
Sizes: `sm`, `md`, `lg`

### Card

```tsx
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

<Card hoverable>
  <CardHeader>
    <CardTitle>Titolo</CardTitle>
  </CardHeader>
  <CardContent>
    Contenuto della card
  </CardContent>
</Card>
```

### Input

```tsx
import Input from '@/components/ui/Input'

<Input
  label="Nome"
  type="text"
  placeholder="Inserisci il tuo nome"
  error="Campo richiesto"
/>
```

## Pagine da Implementare

Le seguenti pagine sono già strutturate nel navbar e footer, ma richiedono implementazione:

- `/club` - Storia, filosofia, strutture, team
- `/servizi` - Grid interattiva dei servizi
- `/eventi` - Calendario eventi con filtri
- `/shop` - E-commerce per prodotti
- `/prenotazioni` - Sistema di booking

## Customizzazione

### Modificare i Colori

Edita `app/globals.css` nella sezione `@theme` per cambiare il design system.

### Aggiungere Nuove Pagine

1. Crea una nuova directory in `app/`
2. Aggiungi `page.tsx`
3. Implementa il componente
4. Aggiorna navbar/footer se necessario

### Modificare Animazioni

Le animazioni Framer Motion possono essere modificate nei singoli componenti:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

## Performance

Il sito è ottimizzato per:
- **Lazy loading** delle immagini
- **Code splitting** automatico con Next.js
- **Fonts optimization** con next/font
- **CSS minification**

## Browser Supportati

- Chrome (ultimi 2 versioni)
- Firefox (ultimi 2 versioni)
- Safari (ultimi 2 versioni)
- Edge (ultimi 2 versioni)

## Accessibilità

- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Color contrast WCAG AA compliant

## Licenza

Questo progetto è stato creato per Scuderie Olgiata.

## Contatti

Per domande o supporto, contatta: info@scuderieolgiata.it

---

Costruito con ❤️ usando Next.js, React e Tailwind CSS
