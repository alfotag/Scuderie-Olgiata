# Problema Video su Vercel

## Problema
I video non vengono visualizzati correttamente su Vercel perché **Vercel non supporta Git LFS di default**. I file LFS vengono sostituiti con pointer files (file di testo piccoli) invece dei video reali.

## Verifica del Problema
Se i video non si vedono su Vercel, verifica aprendo un video nel browser (es: `https://tuo-sito.vercel.app/video/compressed/horse-ranch.mp4`). Se vedi un file di testo invece del video, Git LFS non funziona.

## Soluzioni Possibili

### Soluzione 1: Vercel Blob Storage (CONSIGLIATA)
1. Installa il pacchetto Vercel Blob:
   ```bash
   npm install @vercel/blob
   ```

2. Carica i video su Vercel Blob tramite dashboard o CLI

3. Aggiorna i path nei componenti Interlude per puntare agli URL Blob

### Soluzione 2: Cloudinary (Gratuito per limiti ragionevoli)
1. Crea account su cloudinary.com
2. Carica i video nella Media Library
3. Ottieni gli URL pubblici
4. Aggiorna i path nei componenti

### Soluzione 3: AWS S3 / R2 Cloudflare
1. Configura un bucket S3 o R2
2. Carica i video
3. Configura accesso pubblico
4. Aggiorna i path con gli URL CDN

### Soluzione 4: Post-Build Script Git LFS (Più Complessa)
Aggiungi questo script in `package.json`:
```json
{
  "scripts": {
    "vercel-build": "git lfs pull && next build"
  }
}
```

E configura nelle impostazioni Vercel:
- Build Command: `npm run vercel-build`

**NOTA**: Richiede che il repository abbia LFS configurato correttamente e potrebbe aumentare i tempi di build.

## File Video Coinvolti

### Video Compressi (public/video/compressed/) - ~43MB totali
- aerial-view.mp4 (2.3MB)
- chestnut-horse.mp4 (3.1MB)
- horse-hooves.mp4 (3.3MB)
- horse-portrait.mp4 (3.0MB)
- horse-ranch.mp4 (1.6MB)
- horses-grazing.mp4 (2.6MB)
- jockey-running.mp4 (1.9MB)
- jumping-slowmo.mp4 (5.8MB)
- rider-horse.mp4 (4.7MB)
- saddle-close.mp4 (1.4MB)
- stable-window.mp4 (1.7MB)
- stables-exit.mp4 (8.5MB)
- training.mp4 (2.1MB)
- whatsapp-video.mp4 (1.1MB)

### Video Background (public/video/)
- horse-gallop-bg-compressed.mp4 (1.4MB)
- happy-rider-compressed.mp4 (11MB)
- horse-jumping-compressed.mp4 (7.7MB)
- stable-window-compressed.mp4 (1.5MB)

## Componenti da Aggiornare (se usi CDN esterno)
1. `components/revolutionary/chapters/Interlude1Dreams.tsx`
2. `components/revolutionary/chapters/Interlude2Heritage.tsx`
3. `components/revolutionary/chapters/Interlude3Life.tsx`
4. `components/revolutionary/InterludeChapter.tsx` (video background)

## Priorità Consigliata
1. **Usare Cloudinary** (più semplice, gratuito per iniziare)
2. Vercel Blob (se hai piano Vercel a pagamento)
3. Self-host su VPS con CDN
