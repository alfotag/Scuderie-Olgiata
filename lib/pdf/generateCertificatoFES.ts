import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

interface AffiliationRecord {
  id: string
  nome: string
  cognome: string
  email: string
  telefono: string
  codiceFiscale: string
  indirizzo: string
  citta: string
  cap: string
  piano: string
  timestamp: string
  ipAddress: string
  userAgent: string
  accettaContratto: boolean
}

export async function generateCertificatoFES(record: AffiliationRecord): Promise<Buffer> {
  try {
    // Crea un nuovo documento PDF
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842]) // A4 size in points

    // Carica i font standard (sempre disponibili)
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)

    // Colori
    const primaryColor = rgb(0.545, 0.271, 0.075) // #8B4513
    const accentColor = rgb(0.831, 0.686, 0.216) // #D4AF37
    const textColor = rgb(0.173, 0.094, 0.063) // #2C1810
    const bgColor = rgb(1, 0.973, 0.906) // #FFF8E7

    const { width, height } = page.getSize()

    // Formatta la data
    const date = new Date(record.timestamp)
    const formattedDate = date.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    // BORDI DECORATIVI
    page.drawRectangle({
      x: 40,
      y: 40,
      width: width - 80,
      height: height - 80,
      borderColor: primaryColor,
      borderWidth: 3,
    })

    page.drawRectangle({
      x: 45,
      y: 45,
      width: width - 90,
      height: height - 90,
      borderColor: accentColor,
      borderWidth: 1,
    })

    let yPosition = height - 100

    // TITOLO
    page.drawText('CERTIFICATO', {
      x: width / 2 - 80,
      y: yPosition,
      size: 28,
      font: helveticaBold,
      color: primaryColor,
    })

    yPosition -= 35
    page.drawText('DI FIRMA ELETTRONICA SEMPLICE', {
      x: width / 2 - 165,
      y: yPosition,
      size: 20,
      font: helveticaBold,
      color: accentColor,
    })

    yPosition -= 30
    page.drawText('Scuderie Olgiata', {
      x: width / 2 - 65,
      y: yPosition,
      size: 16,
      font: helvetica,
      color: textColor,
    })

    // Linea divisoria
    yPosition -= 25
    page.drawLine({
      start: { x: 100, y: yPosition },
      end: { x: width - 100, y: yPosition },
      thickness: 2,
      color: accentColor,
    })

    // TESTO PRINCIPALE
    yPosition -= 40
    const mainText = `Il presente certificato attesta che in data ${formattedDate} è stata apposta una Firma Elettronica Semplice (FES) ai sensi del Regolamento eIDAS (Regolamento UE n. 910/2014) per l'accettazione del Contratto di Affiliazione.`

    const words = mainText.split(' ')
    let line = ''
    const maxWidth = width - 140
    let xPos = 70

    for (const word of words) {
      const testLine = line + word + ' '
      const textWidth = helvetica.widthOfTextAtSize(testLine, 12)

      if (textWidth > maxWidth && line !== '') {
        page.drawText(line, {
          x: xPos,
          y: yPosition,
          size: 12,
          font: helvetica,
          color: textColor,
        })
        line = word + ' '
        yPosition -= 18
      } else {
        line = testLine
      }
    }
    if (line) {
      page.drawText(line, {
        x: xPos,
        y: yPosition,
        size: 12,
        font: helvetica,
        color: textColor,
      })
    }

    // BOX ID AFFILIAZIONE
    yPosition -= 40
    page.drawRectangle({
      x: 70,
      y: yPosition - 30,
      width: width - 140,
      height: 40,
      color: bgColor,
      borderColor: accentColor,
      borderWidth: 1,
    })

    // Centro l'ID calcolando la larghezza del testo
    const idText = `ID AFFILIAZIONE: ${record.id}`
    const idTextWidth = helveticaBold.widthOfTextAtSize(idText, 14)
    page.drawText(idText, {
      x: width / 2 - idTextWidth / 2,
      y: yPosition - 15,
      size: 14,
      font: helveticaBold,
      color: primaryColor,
    })

    // DATI DEL FIRMATARIO
    yPosition -= 70
    page.drawText('DATI DEL FIRMATARIO', {
      x: 70,
      y: yPosition,
      size: 14,
      font: helveticaBold,
      color: primaryColor,
    })

    yPosition -= 25
    const dataFields = [
      { label: 'Nome e Cognome:', value: `${record.nome} ${record.cognome}` },
      { label: 'Email:', value: record.email },
      { label: 'Telefono:', value: record.telefono },
      { label: 'Codice Fiscale:', value: record.codiceFiscale },
      { label: 'Residenza:', value: `${record.indirizzo}, ${record.citta} ${record.cap}` },
      { label: 'Servizio Richiesto:', value: record.piano },
    ]

    for (const field of dataFields) {
      page.drawText(field.label, {
        x: 70,
        y: yPosition,
        size: 11,
        font: helvetica,
        color: textColor,
      })
      page.drawText(field.value, {
        x: 200,
        y: yPosition,
        size: 11,
        font: helveticaBold,
        color: textColor,
      })
      yPosition -= 20
    }

    // DATI TECNICI DELLA FIRMA
    yPosition -= 20
    page.drawText('DATI TECNICI DELLA FIRMA ELETTRONICA', {
      x: 70,
      y: yPosition,
      size: 14,
      font: helveticaBold,
      color: primaryColor,
    })

    yPosition -= 25
    page.drawText('Data e Ora:', {
      x: 70,
      y: yPosition,
      size: 11,
      font: helvetica,
      color: textColor,
    })
    page.drawText(formattedDate, {
      x: 200,
      y: yPosition,
      size: 11,
      font: helveticaBold,
      color: textColor,
    })

    yPosition -= 20
    page.drawText('Indirizzo IP:', {
      x: 70,
      y: yPosition,
      size: 11,
      font: helvetica,
      color: textColor,
    })
    page.drawText(record.ipAddress, {
      x: 200,
      y: yPosition,
      size: 11,
      font: helveticaBold,
      color: textColor,
    })

    yPosition -= 20
    page.drawText('User Agent:', {
      x: 70,
      y: yPosition,
      size: 11,
      font: helvetica,
      color: textColor,
    })

    // User Agent può essere lungo, lo tronchiamo se necessario
    const userAgentMaxWidth = 300
    let userAgentText = record.userAgent
    if (helvetica.widthOfTextAtSize(userAgentText, 9) > userAgentMaxWidth) {
      while (helvetica.widthOfTextAtSize(userAgentText + '...', 9) > userAgentMaxWidth) {
        userAgentText = userAgentText.slice(0, -1)
      }
      userAgentText += '...'
    }

    page.drawText(userAgentText, {
      x: 200,
      y: yPosition,
      size: 9,
      font: helvetica,
      color: textColor,
    })

    // DICHIARAZIONE ACCETTATA
    yPosition -= 40
    page.drawText('DICHIARAZIONE ACCETTATA', {
      x: 70,
      y: yPosition,
      size: 12,
      font: helveticaBold,
      color: primaryColor,
    })

    yPosition -= 25
    const declaration = '"Dichiaro solennemente di aver letto e di accettare integralmente i termini e le condizioni del Contratto di Affiliazione. Confermo che i dati forniti sono veritieri e completi."'

    const declWords = declaration.split(' ')
    let declLine = ''
    const declMaxWidth = width - 180

    for (const word of declWords) {
      const testLine = declLine + word + ' '
      const textWidth = helvetica.widthOfTextAtSize(testLine, 10)

      if (textWidth > declMaxWidth && declLine !== '') {
        page.drawText(declLine, {
          x: 90,
          y: yPosition,
          size: 10,
          font: helvetica,
          color: textColor,
        })
        declLine = word + ' '
        yPosition -= 14
      } else {
        declLine = testLine
      }
    }
    if (declLine) {
      page.drawText(declLine, {
        x: 90,
        y: yPosition,
        size: 10,
        font: helvetica,
        color: textColor,
      })
    }

    // RIFERIMENTO AL CONTRATTO
    // Assicuriamoci che ci sia spazio sufficiente (footer inizia a y: 90, servono almeno 120px)
    const minFooterSpace = 120
    const availableSpace = yPosition - minFooterSpace

    // Solo se c'è abbastanza spazio, disegna il box
    if (availableSpace > 80) {
      yPosition -= 25
      const boxHeight = 65
      const boxTopY = yPosition
      const boxBottomY = Math.max(yPosition - boxHeight, minFooterSpace)

      page.drawRectangle({
        x: 70,
        y: boxBottomY,
        width: width - 140,
        height: boxHeight,
        color: rgb(0.95, 0.95, 0.95),
        borderColor: accentColor,
        borderWidth: 1,
      })

      // Posiziona il testo all'interno del box con margini corretti
      let textY = boxTopY - 12

      page.drawText('RIFERIMENTO AL CONTRATTO:', {
        x: 80,
        y: textY,
        size: 9,
        font: helveticaBold,
        color: primaryColor,
      })

      textY -= 16
      page.drawText('Contratto allegato a questa email e disponibile online:', {
        x: 80,
        y: textY,
        size: 8,
        font: helvetica,
        color: textColor,
      })

      textY -= 14
      const linkText = 'https://scuderieolgiata.it/contratto-affiliazione.pdf'

      // Disegna il link sottolineato in blu
      page.drawText(linkText, {
        x: 80,
        y: textY,
        size: 7,
        font: helvetica,
        color: rgb(0.0, 0.4, 0.8), // Blu per il link
      })

      // Sottolineatura del link
      const linkWidth = helvetica.widthOfTextAtSize(linkText, 7)
      page.drawLine({
        start: { x: 80, y: textY - 1 },
        end: { x: 80 + linkWidth, y: textY - 1 },
        thickness: 0.5,
        color: rgb(0.0, 0.4, 0.8),
      })
    }

    // FOOTER
    const footer1 = 'Questo documento è stato generato automaticamente dal sistema di affiliazione delle Scuderie Olgiata.'
    const footer2 = 'La Firma Elettronica Semplice (FES) è valida secondo il Regolamento eIDAS (Regolamento UE n. 910/2014).'

    page.drawText(footer1, {
      x: width / 2 - helvetica.widthOfTextAtSize(footer1, 8) / 2,
      y: 90,
      size: 8,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
    })

    page.drawText(footer2, {
      x: width / 2 - helvetica.widthOfTextAtSize(footer2, 8) / 2,
      y: 78,
      size: 8,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
    })

    // Numero pagina
    const pageNum = `Pagina 1 di 1 - Documento generato il ${new Date().toLocaleString('it-IT')}`
    page.drawText(pageNum, {
      x: width / 2 - helvetica.widthOfTextAtSize(pageNum, 8) / 2,
      y: 60,
      size: 8,
      font: helvetica,
      color: rgb(0.4, 0.4, 0.4),
    })

    // Salva il PDF come Buffer
    const pdfBytes = await pdfDoc.save()
    return Buffer.from(pdfBytes)

  } catch (error) {
    console.error('Errore nella generazione del Certificato FES:', error)
    throw error
  }
}
