'use client';

import InterludeChapter from '../InterludeChapter';
import { getVideoUrl } from '@/lib/cloudinary-videos';

export default function Interlude2Heritage() {
  const media = [
    {
      type: 'video-group' as const,
      videos: [
        {
          src: getVideoUrl('/video/compressed/chestnut-horse.mp4'),
          caption: 'I nostri campi'
        },
        {
          src: getVideoUrl('/video/compressed/stables-exit.mp4'),
          caption: 'Le scuderie'
        }
      ],
      mainCaption: 'Gli Spazi Equestri',
      subCaption: 'Campi regolamentari e scuderie storiche curate nei minimi dettagli per il benessere di cavalli e cavalieri.'
    },
    {
      type: 'video-group' as const,
      videos: [
        {
          src: getVideoUrl('/video/compressed/rider-horse.mp4'),
          caption: 'La giostra coperta'
        },
        {
          src: getVideoUrl('/video/compressed/training.mp4'),
          caption: 'Il tondino'
        }
      ],
      mainCaption: 'Le Strutture di Addestramento',
      subCaption: 'Tondini coperti e scoperti per l\'allenamento professionale in ogni condizione.'
    },
    {
      type: 'video-group' as const,
      videos: [
        {
          src: 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763413819/WhatsApp_Video_2025-11-17_at_11.17.12_1_gq2hd4.mp4',
          caption: 'L\'eccellenza dell\'addestramento'
        },
        {
          src: 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763413819/WhatsApp_Video_2025-11-17_at_11.17.14_mmo9hq.mp4',
          caption: 'Tradizione e innovazione'
        }
      ],
      mainCaption: 'La Cura dei Dettagli',
      subCaption: 'Ogni aspetto delle nostre strutture è pensato per garantire il massimo benessere e performance, nel rispetto della tradizione equestre.'
    }
  ];

  return (
    <InterludeChapter
      title="Le Nostre Strutture Equestri"
      subtitle="Spazi progettati per l'eccellenza dell'addestramento"
      media={media}
      accentColor="#D4AF37"
      bookNumber="II"
    />
  );
}
