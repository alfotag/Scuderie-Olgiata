import BookTeaser from '@/components/revolutionary/BookTeaser'

export const metadata = {
  title: 'Anteprima - Scuderie Olgiata',
  description: 'Un\'anteprima esclusiva della rivoluzione equestre che sta per arrivare',
}

export default function TeaserPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <BookTeaser />
    </main>
  )
}
