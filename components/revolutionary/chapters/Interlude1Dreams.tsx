'use client';

import InterludeChapter from '../InterludeChapter';
import { getVideoUrl } from '@/lib/cloudinary-videos';

export default function Interlude1Dreams() {
  const media = [
    {
      type: 'video-group' as const,
      videos: [
        {
          src: getVideoUrl('/video/compressed/horse-ranch.mp4'),
          caption: 'Vista dall\'alto delle Scuderie'
        },
        {
          src: getVideoUrl('/video/compressed/horse-portrait.mp4'),
          caption: 'L\'atmosfera del circolo'
        }
      ],
      mainCaption: 'Il Circolo Olgiata',
      subCaption: 'Un luogo dove tradizione e passione equestre si incontrano dal 1948. Oltre 75 anni di storia tra i più prestigiosi maneggi d\'Italia.'
    },
    {
      type: 'video-group' as const,
      videos: [
        {
          src: getVideoUrl('/video/compressed/stable-window.mp4'),
          caption: 'La luce del mattino'
        },
        {
          src: getVideoUrl('/video/compressed/saddle-close.mp4'),
          caption: 'I dettagli che fanno la differenza'
        }
      ],
      mainCaption: 'La Nostra Visione',
      subCaption: 'Creare un centro di eccellenza equestre dove ogni cavaliere, dal principiante al professionista, possa crescere e realizzare i propri sogni.'
    },
    {
      type: 'video-group' as const,
      videos: [
        {
          src: 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763413819/WhatsApp_Video_2025-11-17_at_11.17.11_hjue5y.mp4',
          caption: 'La passione equestre'
        },
        {
          src: 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763413820/WhatsApp_Video_2025-11-17_at_11.17.12_z54bsm.mp4',
          caption: 'Momenti di pura magia'
        }
      ],
      mainCaption: 'L\'Esperienza Olgiata',
      subCaption: 'Ogni giorno alle Scuderie Olgiata è un\'opportunità per vivere emozioni autentiche e creare ricordi indimenticabili.'
    }
  ];

  return (
    <InterludeChapter
      title="La Magia dell'Olgiata"
      subtitle="Dove storia, passione e tradizione equestre si fondono"
      media={media}
      accentColor="#8B4513"
      bookNumber="I"
    />
  );
}
