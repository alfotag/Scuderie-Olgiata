import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { Resend } from 'resend'
import { generateCertificatoFES } from '@/lib/pdf/generateCertificatoFES'

// Lazy initialization di Resend per evitare errori se la chiave API non è configurata
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY non configurata')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

interface AffiliationData {
  nome: string
  cognome: string
  email: string
  telefono: string
  codiceFiscale: string
  indirizzo: string
  citta: string
  cap: string
  piano: string
  accettaContratto: boolean
}

interface AffiliationRecord extends AffiliationData {
  id: string
  timestamp: string
  ipAddress: string
  userAgent: string
}

export async function POST(request: NextRequest) {
  try {
    const body: AffiliationData = await request.json()

    console.log('Received affiliation request:', { ...body, accettaContratto: body.accettaContratto })

    // Validazione base
    if (!body.nome || !body.cognome || !body.email) {
      return NextResponse.json(
        { error: 'Nome, cognome ed email sono obbligatori' },
        { status: 400 }
      )
    }

    if (!body.accettaContratto) {
      return NextResponse.json(
        { error: 'Il contratto deve essere accettato' },
        { status: 400 }
      )
    }

    // Cattura dati per firma elettronica
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const timestamp = new Date().toISOString()
    const id = `AFF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Crea record completo
    const record: AffiliationRecord = {
      ...body,
      id,
      timestamp,
      ipAddress,
      userAgent,
    }

    // Salva in file JSON (directory data/affiliations)
    try {
      const dataDir = path.join(process.cwd(), 'data', 'affiliations')

      // Crea directory se non esiste
      if (!existsSync(dataDir)) {
        await mkdir(dataDir, { recursive: true })
        console.log('Created data directory:', dataDir)
      }

      // Leggi affiliazioni esistenti o crea array vuoto
      const affiliationsFile = path.join(dataDir, 'affiliations.json')
      let affiliations: AffiliationRecord[] = []

      if (existsSync(affiliationsFile)) {
        try {
          const fileContent = await readFile(affiliationsFile, 'utf-8')
          affiliations = JSON.parse(fileContent)
        } catch (parseError) {
          console.error('Error parsing affiliations file:', parseError)
          // Se il file è corrotto, crea un backup e ricomincia
          const backupFile = path.join(dataDir, `affiliations-backup-${Date.now()}.json`)
          await writeFile(backupFile, await readFile(affiliationsFile, 'utf-8'))
          affiliations = []
        }
      }

      // Aggiungi nuova affiliazione
      affiliations.push(record)

      // Salva file aggiornato
      await writeFile(affiliationsFile, JSON.stringify(affiliations, null, 2))
      console.log('Saved to affiliations.json')

      // Salva anche file individuale per backup
      const individualFile = path.join(dataDir, `${id}.json`)
      await writeFile(individualFile, JSON.stringify(record, null, 2))
      console.log('Saved individual file:', id)

    } catch (fileError) {
      console.error('Error saving files:', fileError)
      // Anche se il salvataggio file fallisce, continuiamo
      // In produzione dovresti salvare su database
    }

    // Invia email di notifica alla segreteria
    try {
      await sendNotificationToSecretary(record)
      console.log('Notification email sent to secretary')
    } catch (emailError) {
      console.error('Error sending email to secretary:', emailError)
      // Non blocchiamo l'affiliazione se l'email fallisce
    }

    // Invia email di conferma all'affiliato
    try {
      await sendConfirmationToAffiliate(record)
      console.log('Confirmation email sent to affiliate')
    } catch (emailError) {
      console.error('Error sending email to affiliate:', emailError)
      // Non blocchiamo l'affiliazione se l'email fallisce
    }

    return NextResponse.json({
      success: true,
      message: 'Affiliazione completata con successo',
      id: record.id,
    })

  } catch (error) {
    console.error('Error processing affiliation:', error)
    const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto'
    return NextResponse.json(
      {
        error: 'Errore durante il processo di affiliazione',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

// Funzione per inviare notifica alla segreteria
async function sendNotificationToSecretary(record: AffiliationRecord) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email will not be sent.')
    return
  }

  try {
    // Formatta la data in modo leggibile
    const date = new Date(record.timestamp)
    const formattedDate = date.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Crea email HTML per la segreteria
    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Georgia, serif; background-color: #f9f6f0; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 4px solid #8B6914; border-radius: 8px; padding: 30px; }
    .header { text-align: center; color: #2C1810; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 28px; font-weight: normal; }
    .header p { margin: 5px 0 0 0; color: #8B4513; font-style: italic; }
    .section { margin: 20px 0; }
    .section h2 { color: #8B4513; font-size: 18px; font-weight: normal; border-bottom: 1px solid #D4AF37; padding-bottom: 10px; }
    .info-row { display: flex; padding: 8px 0; border-bottom: 1px dotted #ddd; }
    .info-label { font-weight: bold; color: #5D4037; width: 150px; }
    .info-value { color: #2C1810; flex: 1; }
    .alert { background: #FFF8E7; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; }
    .footer { text-align: center; color: #8B4513; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #D4AF37; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🐴 Nuova Affiliazione</h1>
      <p>Scuderie Olgiata</p>
    </div>

    <div class="alert">
      <strong>✅ Nuova richiesta di affiliazione ricevuta!</strong><br>
      Un nuovo membro ha completato il contratto di affiliazione.
    </div>

    <div class="section">
      <h2>📋 Dati Personali</h2>
      <div class="info-row">
        <div class="info-label">Nome:</div>
        <div class="info-value">${record.nome} ${record.cognome}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Email:</div>
        <div class="info-value">${record.email}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Telefono:</div>
        <div class="info-value">${record.telefono}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Codice Fiscale:</div>
        <div class="info-value">${record.codiceFiscale}</div>
      </div>
    </div>

    <div class="section">
      <h2>🏠 Residenza</h2>
      <div class="info-row">
        <div class="info-label">Indirizzo:</div>
        <div class="info-value">${record.indirizzo}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Città:</div>
        <div class="info-value">${record.citta}, ${record.cap}</div>
      </div>
    </div>

    <div class="section">
      <h2>💼 Servizio Richiesto</h2>
      <div class="info-row">
        <div class="info-label">Piano:</div>
        <div class="info-value"><strong>${record.piano}</strong></div>
      </div>
    </div>

    <div class="section" style="background: #FFF8E7; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0;">
      <h2 style="color: #8B4513; margin-top: 0;">✅ ACCETTAZIONE CONTRATTO</h2>
      <div class="info-row" style="border: none; padding: 10px 0;">
        <div class="info-label" style="width: 200px;">Contratto Accettato:</div>
        <div class="info-value"><strong style="color: #2E7D32; font-size: 18px;">✓ SÌ</strong></div>
      </div>
      <div class="info-row" style="border: none; padding: 10px 0;">
        <div class="info-label" style="width: 200px;">Data/Ora Accettazione:</div>
        <div class="info-value"><strong>${formattedDate}</strong></div>
      </div>
      <div style="background: white; padding: 12px; border-radius: 4px; margin-top: 10px;">
        <p style="margin: 0; font-size: 13px; color: #2C1810; line-height: 1.6;">
          <strong>Dichiarazione accettata dall'utente:</strong><br>
          <em>"Dichiaro solennemente di aver letto e di accettare integralmente i termini e le condizioni del Contratto di Affiliazione.
          Confermo che i dati forniti sono veritieri e completi."</em>
        </p>
      </div>
    </div>

    <div class="section">
      <h2>⚖️ Dati Firma Elettronica Semplice (FES)</h2>
      <div class="info-row">
        <div class="info-label">ID Affiliazione:</div>
        <div class="info-value">${record.id}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Data e Ora:</div>
        <div class="info-value">${formattedDate}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Indirizzo IP:</div>
        <div class="info-value">${record.ipAddress}</div>
      </div>
      <div class="info-row">
        <div class="info-label">User Agent:</div>
        <div class="info-value" style="font-size: 11px; color: #666;">${record.userAgent}</div>
      </div>
    </div>

    <div class="alert" style="background: #E8F5E9; border-left-color: #4CAF50;">
      <strong>📎 ALLEGATI</strong><br>
      Questa email contiene i seguenti documenti:<br>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li><strong>Certificato-FES-${record.id}.pdf</strong> - Certificato di Firma Elettronica Semplice</li>
        <li><strong>Contratto-Affiliazione-Scuderie-Olgiata.pdf</strong> - Contratto di Affiliazione</li>
      </ul>
    </div>

    <div class="footer">
      <p>Questa email è stata generata automaticamente dal sistema di affiliazione.<br>
      I dati sono stati salvati in: <code>data/affiliations/${record.id}.json</code></p>
    </div>
  </div>
</body>
</html>
    `

    // Prepara gli allegati
    const contractPath = path.join(process.cwd(), 'public', 'documents', 'contratto-affiliazione.pdf')
    const attachments: any[] = []

    // 1. Genera Certificato FES (Firma Elettronica Semplice)
    try {
      const certificatoBuffer = await generateCertificatoFES(record)
      attachments.push({
        filename: `Certificato-FES-${record.id}.pdf`,
        content: certificatoBuffer,
      })
      console.log('Certificato FES generato con successo')
    } catch (pdfError) {
      console.error('Errore generazione Certificato FES:', pdfError)
    }

    // 2. Aggiungi contratto PDF base se esiste
    if (existsSync(contractPath)) {
      const contractBuffer = await readFile(contractPath)
      attachments.push({
        filename: 'Contratto-Affiliazione-Scuderie-Olgiata.pdf',
        content: contractBuffer,
      })
      console.log('Contratto PDF allegato')
    }

    const resend = getResendClient()
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Scuderie Olgiata <noreply@tagliamontestable.it>',
      to: 'segreteria@tagliamontestable.it',
      subject: '[AFFILIAZIONE] Nuova richiesta - ' + record.nome + ' ' + record.cognome,
      html: emailHTML,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    console.log('Email sent successfully to secretary:', data)
    return data

  } catch (error) {
    console.error('Error sending notification email:', error)
    throw error
  }
}

// Funzione per inviare conferma all'affiliato
async function sendConfirmationToAffiliate(record: AffiliationRecord) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email will not be sent.')
    return
  }

  try {
    // Formatta la data in modo leggibile
    const date = new Date(record.timestamp)
    const formattedDate = date.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Crea email HTML per l'affiliato
    const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Georgia, serif; background-color: #f9f6f0; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 4px solid #8B6914; border-radius: 8px; padding: 30px; }
    .header { text-align: center; color: #2C1810; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 28px; font-weight: normal; }
    .header p { margin: 5px 0 0 0; color: #8B4513; font-style: italic; }
    .welcome { background: #E8F5E9; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0; text-align: center; }
    .welcome h2 { margin: 0 0 10px 0; color: #2E7D32; font-size: 22px; }
    .welcome p { margin: 0; color: #1B5E20; line-height: 1.6; }
    .section { margin: 20px 0; }
    .section h3 { color: #8B4513; font-size: 18px; font-weight: normal; border-bottom: 1px solid #D4AF37; padding-bottom: 10px; }
    .info-box { background: #FFF8E7; padding: 15px; border-radius: 4px; margin: 15px 0; }
    .info-row { display: flex; padding: 8px 0; border-bottom: 1px dotted #ddd; }
    .info-label { font-weight: bold; color: #5D4037; width: 180px; }
    .info-value { color: #2C1810; flex: 1; }
    .alert { background: #FFF3E0; border-left: 4px solid #FF9800; padding: 15px; margin: 20px 0; }
    .footer { text-align: center; color: #8B4513; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #D4AF37; }
    .cta { text-align: center; margin: 25px 0; }
    .cta p { color: #5D4037; font-size: 14px; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Benvenuto alle Scuderie Olgiata</h1>
      <p>La tua affiliazione è stata confermata</p>
    </div>

    <div class="welcome">
      <h2>Benvenuto, ${record.nome}!</h2>
      <p>Siamo felici di darti il benvenuto nella famiglia delle Scuderie Olgiata.<br>
      La tua richiesta di affiliazione è stata ricevuta e confermata con successo.</p>
    </div>

    <div class="section">
      <h3>Riepilogo della tua Affiliazione</h3>
      <div class="info-box">
        <div class="info-row">
          <div class="info-label">ID Affiliazione:</div>
          <div class="info-value"><strong>${record.id}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Data e Ora:</div>
          <div class="info-value">${formattedDate}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Servizio Richiesto:</div>
          <div class="info-value"><strong>${record.piano}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Nome Completo:</div>
          <div class="info-value">${record.nome} ${record.cognome}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email:</div>
          <div class="info-value">${record.email}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Telefono:</div>
          <div class="info-value">${record.telefono}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>Documenti Allegati</h3>
      <p style="color: #2C1810; line-height: 1.6;">
        In allegato a questa email troverai i seguenti documenti importanti:
      </p>
      <ul style="color: #2C1810; line-height: 1.8;">
        <li><strong>Certificato di Firma Elettronica Semplice (FES)</strong> - Questo documento certifica la validità legale della tua firma digitale secondo il Regolamento eIDAS (UE n. 910/2014). Conservalo con cura come prova della tua accettazione del contratto.</li>
        <li><strong>Contratto di Affiliazione</strong> - Una copia completa del contratto di affiliazione che hai accettato.</li>
      </ul>
    </div>

    <div class="alert">
      <strong>⚠️ IMPORTANTE</strong><br>
      Ti consigliamo di conservare questi documenti in un luogo sicuro. Potrebbero esserti richiesti in futuro per verificare la tua affiliazione.
    </div>

    <div class="cta">
      <p><strong>Prossimi Passi:</strong><br>
      La nostra segreteria ti contatterà a breve per completare la procedura di affiliazione e fornirti tutte le informazioni necessarie sui nostri servizi.</p>
      <p style="margin-top: 15px;">Per qualsiasi domanda o chiarimento, non esitare a contattarci a:<br>
      <strong>segreteria@tagliamontestable.it</strong></p>
    </div>

    <div class="footer">
      <p><strong>Scuderie Olgiata</strong><br>
      Via L.go Olgiata, 15 - 00123 Roma<br>
      Tel: +39 334 948 3071</p>
      <p style="margin-top: 15px; font-size: 11px; color: #999;">
      Questa è una email automatica. Si prega di non rispondere direttamente a questo messaggio.<br>
      Per assistenza, contatta: segreteria@tagliamontestable.it
      </p>
    </div>
  </div>
</body>
</html>
    `

    // Prepara gli allegati
    const contractPath = path.join(process.cwd(), 'public', 'documents', 'contratto-affiliazione.pdf')
    const attachments: any[] = []

    // 1. Genera Certificato FES (Firma Elettronica Semplice)
    try {
      const certificatoBuffer = await generateCertificatoFES(record)
      attachments.push({
        filename: `Certificato-FES-${record.id}.pdf`,
        content: certificatoBuffer,
      })
      console.log('Certificato FES generato per affiliato')
    } catch (pdfError) {
      console.error('Errore generazione Certificato FES per affiliato:', pdfError)
    }

    // 2. Aggiungi contratto PDF base se esiste
    if (existsSync(contractPath)) {
      const contractBuffer = await readFile(contractPath)
      attachments.push({
        filename: 'Contratto-Affiliazione-Scuderie-Olgiata.pdf',
        content: contractBuffer,
      })
      console.log('Contratto PDF allegato per affiliato')
    }

    const resend = getResendClient()
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Scuderie Olgiata <noreply@tagliamontestable.it>',
      to: record.email,
      subject: 'Conferma Affiliazione - Scuderie Olgiata',
      html: emailHTML,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    console.log('Confirmation email sent successfully to affiliate:', data)
    return data

  } catch (error) {
    console.error('Error sending confirmation email to affiliate:', error)
    throw error
  }
}
