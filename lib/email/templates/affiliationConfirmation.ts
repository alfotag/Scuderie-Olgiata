interface EmailData {
  nome: string
  cognome: string
  email: string
  piano: string
  id: string
  timestamp: string
}

export function generateAffiliationConfirmationEmail(data: EmailData): string {
  const formattedDate = new Date(data.timestamp).toLocaleString('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conferma Affiliazione - Scuderie Olgiata</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a472a 0%, #0f2818 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                Scuderie Olgiata
              </h1>
              <p style="margin: 10px 0 0 0; color: #d4af37; font-size: 14px; letter-spacing: 2px;">
                AFFILIAZIONE CONFERMATA
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1a472a; font-size: 24px;">
                Benvenuto/a ${data.nome} ${data.cognome}!
              </h2>

              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Siamo lieti di confermare la tua affiliazione alle <strong>Scuderie Olgiata</strong>.
                Il tuo contratto è stato registrato con successo.
              </p>

              <!-- Details Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; border-radius: 8px; margin: 30px 0; border: 1px solid #e0e0e0;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="margin: 0 0 15px 0; color: #1a472a; font-size: 18px;">
                      Dettagli Affiliazione
                    </h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px; width: 40%;">
                          <strong>ID Contratto:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                          ${data.id}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">
                          <strong>Piano Selezionato:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                          ${data.piano}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">
                          <strong>Data e Ora:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                          ${formattedDate}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 14px;">
                          <strong>Email:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #333333; font-size: 14px;">
                          ${data.email}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Important Notice -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #e8f5e9; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0; color: #2e7d32; font-size: 14px; line-height: 1.6;">
                      <strong>📋 Nota sulla Firma Elettronica</strong><br>
                      Questa affiliazione è stata registrata con Firma Elettronica Semplice (FES) ai sensi del Regolamento eIDAS.
                      Sono stati registrati: indirizzo IP, timestamp e tutti i dati forniti durante la compilazione del form.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 25px 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                <strong>Prossimi passi:</strong>
              </p>

              <ul style="color: #333333; font-size: 15px; line-height: 1.8; padding-left: 20px;">
                <li>Conserva questa email come conferma della tua affiliazione</li>
                <li>Il contratto firmato è allegato a questa email per la tua documentazione</li>
                <li>Sarai contattato entro 48 ore per finalizzare i dettagli di pagamento</li>
                <li>Riceverai la tua tessera associativa entro 5 giorni lavorativi</li>
              </ul>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://scuderieolgiata.it/area-riservata"
                       style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #1a472a 0%, #0f2818 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600;">
                      Accedi all'Area Riservata
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                Per qualsiasi domanda o chiarimento, non esitare a contattarci:<br>
                📧 <a href="mailto:info@scuderieolgiata.it" style="color: #1a472a; text-decoration: none;">info@scuderieolgiata.it</a><br>
                📱 <a href="tel:+390612345678" style="color: #1a472a; text-decoration: none;">+39 06 1234 5678</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
                <strong>Scuderie Olgiata</strong>
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                Via della Camilluccia, 559 - 00135 Roma<br>
                Tel: +39 06 1234 5678 | Email: info@scuderieolgiata.it
              </p>
              <p style="margin: 15px 0 0 0; color: #999999; font-size: 11px;">
                © ${new Date().getFullYear()} Scuderie Olgiata. Tutti i diritti riservati.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
