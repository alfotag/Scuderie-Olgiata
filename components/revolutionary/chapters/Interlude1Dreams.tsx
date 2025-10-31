'use client';

import InterludeChapter from '../InterludeChapter';

export default function Interlude1Dreams() {
  const media = [
    {
      type: 'video-group' as const,
      videos: [
        {
          src: '/video/compressed/horse-ranch.mp4',
          caption: 'Vista dall\'alto delle Scuderie'
        },
        {
          src: '/video/compressed/horse-portrait.mp4',
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
          src: '/video/compressed/stable-window.mp4',
          caption: 'La luce del mattino'
        },
        {
          src: '/video/compressed/saddle-close.mp4',
          caption: 'I dettagli che fanno la differenza'
        }
      ],
      mainCaption: 'La Nostra Visione',
      subCaption: 'Creare un centro di eccellenza equestre dove ogni cavaliere, dal principiante al professionista, possa crescere e realizzare i propri sogni.'
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
