# 📸 Guida per Creare gli Screenshot delle Pagine Titolo

## 🎯 Perché Servono gli Screenshot?

Per eliminare il ritardo/"BOOM" effect quando si girano le pagine del libro, le pagine di sinistra (pagine titolo) ora utilizzano **immagini statiche pre-renderizzate** invece di componenti React dinamici.

Questo significa:
- ✅ Caricamento istantaneo (nessun delay)
- ✅ Nessun effetto "BOOM" ritardato
- ✅ Pagine già pronte come un vero libro
- ✅ Performance ottimale

---

## 📋 Screenshot Necessari

Devi creare **3 screenshot**, uno per ogni interludio:

```
/public/images/interludes/
├── title-page-interlude1.png  (Sogni & Connessioni - Verde)
├── title-page-interlude2.png  (Memorie & Radici - Oro)
└── title-page-interlude3.png  (Vita & Comunità - Blu)
```

---

## 🛠️ Come Creare gli Screenshot

### **Metodo 1: Screenshot dal Browser (Consigliato)**

1. **Avvia il server di sviluppo**:
   ```bash
   npm run dev
   ```

2. **Apri il sito** in Chrome/Edge: http://localhost:3000

3. **Naviga fino al primo interludio** (Interlude I - Sogni & Connessioni)

4. **Aspetta che il libro si apra completamente**

5. **Prendi screenshot SOLO della pagina sinistra**:
   - Premi `F12` per aprire DevTools
   - Vai alla tab "Elements"
   - Trova il div della pagina sinistra (quello con la classe che contiene "left")
   - Click destro su quell'elemento → "Capture node screenshot"
   - Oppure usa `Ctrl+Shift+P` → "Screenshot" → "Capture node screenshot"

6. **Salva il file** come:
   - `title-page-interlude1.png` in `/public/images/interludes/`

7. **Ripeti per gli altri 2 interludi**:
   - Naviga all'Interlude II (dopo capitolo 4)
   - Screenshot → `title-page-interlude2.png`
   - Naviga all'Interlude III (dopo capitolo 6)
   - Screenshot → `title-page-interlude3.png`

---

### **Metodo 2: Creare con Photoshop/Figma (Manuale)**

Se preferisci creare le immagini da zero invece di fare screenshot:

**Dimensioni**: 600px × 800px (proporzioni pagina libro)

**Design per ogni interludio**:

#### **Interlude 1 - "Sogni & Connessioni"**
- **Colore accento**: `#10B981` (Verde Smeraldo)
- **Sfondo**: Gradiente radiale da `rgba(139, 69, 19, 0.3)` a `rgba(0, 0, 0, 0.95)`
- **Bordo decorato**: Ornamento angolare dorato
- **Numero libro**: "I" (grande, serif, ambrato)
- **Titolo**: "Sogni & Connessioni" (font: Georgia, bianco)
- **Sottotitolo**: "Quando il tempo si ferma tra uomo e cavallo" (piccolo, corsivo, grigio/50)
- **Texture**: Effetto carta antica con noise
- **Effetti**: Vignetta radiale, film grain sottile

#### **Interlude 2 - "Memorie & Radici"**
- **Colore accento**: `#D4AF37` (Oro)
- **Numero libro**: "II"
- **Titolo**: "Memorie & Radici"
- **Sottotitolo**: "L'eredità che ci rende ciò che siamo"
- (Stesso stile di design)

#### **Interlude 3 - "Vita & Comunità"**
- **Colore accento**: `#3B82F6` (Blu)
- **Numero libro**: "III"
- **Titolo**: "Vita & Comunità"
- **Sottotitolo**: "Le persone che trasformano un luogo in una famiglia"
- (Stesso stile di design)

---

## 🎨 Specifiche Tecniche

- **Formato**: PNG con trasparenza (se possibile) o JPG
- **Risoluzione**: 1200px × 1600px (2x per retina) o 600px × 800px (1x)
- **Qualità**: 90% per JPG
- **Dimensione file**: Max 300KB per immagine
- **Colori**: RGB (non CMYK)

---

## ✅ Verifica Funzionamento

Dopo aver creato e salvato gli screenshot:

1. **Riavvia il server** (se necessario):
   ```bash
   npm run dev
   ```

2. **Naviga agli interludi** e verifica che:
   - ✅ Le pagine titolo (sinistra) si caricano istantaneamente
   - ✅ Non c'è più l'effetto "BOOM" ritardato
   - ✅ Le immagini hanno l'aspetto corretto
   - ✅ I colori corrispondono al tema

3. **Se vedi immagini mancanti**:
   - Controlla che i file siano nella cartella giusta
   - Verifica i nomi file (devono essere esatti!)
   - Prova Ctrl+F5 per refresh completo

---

## 🔄 Fallback Automatico

Se gli screenshot non sono presenti, il sistema torna automaticamente al rendering dinamico (quello vecchio). Quindi:

- ⚠️ **CON screenshot**: Caricamento istantaneo ✅
- ⚠️ **SENZA screenshot**: Rendering dinamico con possibile ritardo ⏱️

---

## 🐛 Risoluzione Problemi

### **Le immagini non si vedono**
```bash
# Verifica che i file esistano
dir "C:\Users\alfot\Desktop\sito scuderie olgiata\scuderie-olgiata\public\images\interludes\title-page-*.png"
```

### **Le dimensioni non sono giuste**
- Assicurati che le proporzioni siano 3:4 (altezza 1.33x larghezza)
- Usa object-fit: cover nell'immagine

### **I colori sembrano diversi**
- Usa lo stesso colore accentColor specificato in ogni interludio
- Verifica che il profilo colore sia sRGB

---

## 💡 Suggerimenti

1. **Usa Chrome DevTools** per screenshot pixel-perfect
2. **Aspetta l'animazione completa** prima di fare screenshot
3. **Controlla la preview** in locale prima di considerare finito
4. **Comprimi le immagini** con TinyPNG o simili per performance ottimali

---

## 📞 Pronto!

Ora il tuo libro fiabesco avrà pagine che si girano senza ritardi, proprio come un libro vero! 📖✨

Buona fortuna! 🐴
