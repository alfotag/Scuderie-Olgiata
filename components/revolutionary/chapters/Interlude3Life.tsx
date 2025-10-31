'use client';

import InterludeChapter from '../InterludeChapter';

export default function Interlude3Life() {
  const media = [
    {
      type: 'video-group' as const,
      videos: [
        {
          src: '/video/compressed/horses-grazing.mp4',
          caption: 'La Clubhouse'
        },
        {
          src: '/video/compressed/whatsapp-video.mp4',
          caption: 'Centro Benessere'
        }
      ],
      mainCaption: 'Spazi di Ritrovo e Benessere',
      subCaption: 'Ristorante, clubhouse e centro wellness: luoghi eleganti dove prendersi cura di sé dopo una giornata in sella.',
      audioSrc: '/audio/Interlude_3_parte_2.mp3'
    },
    {
      type: 'video-group' as const,
      videos: [
        {
          src: '/video/compressed/aerial-view.mp4',
          caption: 'Tennis e Padel'
        },
        {
          src: '/video/compressed/jockey-running.mp4',
          caption: 'Sport e Tempo Libero'
        }
      ],
      mainCaption: 'Attività Sportive e Ricreative',
      subCaption: 'Tennis, padel, calcio e molto altro: lo sport continua anche fuori dalla sella, per tutta la famiglia.',
      audioSrc: '/audio/Interlude_3_parte_3.mp3'
    }
  ];

  return (
    <InterludeChapter
      title="Vita Sociale & Servizi"
      subtitle="Molto più di un maneggio: un centro di vita e aggregazione"
      media={media}
      accentColor="#3B82F6"
      bookNumber="III"
      titleAudioSrc="/audio/Interlude_3_parte_1.mp3"
    />
  );
}
