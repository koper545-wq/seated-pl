// Email templates for Seated platform
// Uses Resend for sending emails

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

// ============================================
// GUEST EMAILS
// ============================================

/**
 * Email sent when guest submits a booking request
 */
export function bookingRequestConfirmation(data: {
  guestName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  hostName: string;
  ticketCount: number;
  totalPrice: number;
}): EmailTemplate {
  return {
    subject: `Potwierdzenie zapytania - ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706; margin: 0;">🍽️ Seated</h1>
          </div>

          <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: #92400e;">Zapytanie wysłane!</h2>
            <p style="margin: 0; color: #78716c;">Twoje zapytanie o rezerwację zostało wysłane do hosta.</p>
          </div>

          <p>Cześć <strong>${data.guestName}</strong>! 👋</p>

          <p>Dziękujemy za zainteresowanie wydarzeniem. Twoje zapytanie o rezerwację zostało przesłane do hosta <strong>${data.hostName}</strong>.</p>

          <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #44403c;">📋 Szczegóły rezerwacji</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Wydarzenie:</td>
                <td style="padding: 8px 0; font-weight: 600;">${data.eventTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Data:</td>
                <td style="padding: 8px 0;">${data.eventDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Godzina:</td>
                <td style="padding: 8px 0;">${data.eventTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Liczba biletów:</td>
                <td style="padding: 8px 0;">${data.ticketCount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Kwota:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #059669;">${data.totalPrice} zł</td>
              </tr>
            </table>
          </div>

          <div style="background: #dbeafe; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>⏳ Co dalej?</strong><br>
              Host ma 48 godzin na potwierdzenie Twojej rezerwacji. Otrzymasz email z decyzją i szczegółami płatności.
            </p>
          </div>

          <p style="color: #78716c; font-size: 14px;">
            Masz pytania? Możesz zadać je bezpośrednio na stronie wydarzenia.
          </p>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Ten email został wysłany automatycznie przez platformę Seated.<br>
            © ${new Date().getFullYear()} Seated. Wszystkie prawa zastrzeżone.
          </p>
        </body>
      </html>
    `,
    text: `
Cześć ${data.guestName}!

Twoje zapytanie o rezerwację zostało wysłane do hosta ${data.hostName}.

SZCZEGÓŁY REZERWACJI:
- Wydarzenie: ${data.eventTitle}
- Data: ${data.eventDate}
- Godzina: ${data.eventTime}
- Liczba biletów: ${data.ticketCount}
- Kwota: ${data.totalPrice} zł

CO DALEJ?
Host ma 48 godzin na potwierdzenie Twojej rezerwacji. Otrzymasz email z decyzją i szczegółami płatności.

---
Ten email został wysłany automatycznie przez platformę Seated.
    `,
  };
}

/**
 * Email sent when host approves booking - includes full address and details
 */
export function bookingApproved(data: {
  guestName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventDuration: number;
  hostName: string;
  hostPhone?: string;
  fullAddress: string;
  neighborhood: string;
  ticketCount: number;
  totalPrice: number;
  menuDescription: string;
  dietaryOptions: string[];
  whatToBring?: string;
  specialInstructions?: string;
  paymentLink?: string;
}): EmailTemplate {
  return {
    subject: `✅ Rezerwacja potwierdzona - ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706; margin: 0;">🍽️ Seated</h1>
          </div>

          <div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: #166534;">🎉 Rezerwacja potwierdzona!</h2>
            <p style="margin: 0; color: #15803d;">Twoje miejsce na wydarzeniu zostało zarezerwowane.</p>
          </div>

          <p>Cześć <strong>${data.guestName}</strong>! 👋</p>

          <p>Świetna wiadomość! <strong>${data.hostName}</strong> potwierdził/a Twoją rezerwację. Poniżej znajdziesz wszystkie szczegóły wydarzenia.</p>

          ${data.paymentLink ? `
          <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
            <p style="margin: 0 0 15px 0; color: #92400e; font-weight: 600;">💳 Dokończ płatność</p>
            <a href="${data.paymentLink}" style="display: inline-block; background: #d97706; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">Zapłać ${data.totalPrice} zł</a>
            <p style="margin: 15px 0 0 0; color: #78716c; font-size: 12px;">Masz 24h na dokończenie płatności</p>
          </div>
          ` : ''}

          <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #44403c;">📋 Szczegóły wydarzenia</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Wydarzenie:</td>
                <td style="padding: 8px 0; font-weight: 600;">${data.eventTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Data:</td>
                <td style="padding: 8px 0;">${data.eventDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Godzina:</td>
                <td style="padding: 8px 0;">${data.eventTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Czas trwania:</td>
                <td style="padding: 8px 0;">~${data.eventDuration} min</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Liczba biletów:</td>
                <td style="padding: 8px 0;">${data.ticketCount}</td>
              </tr>
            </table>
          </div>

          <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #92400e;">📍 Adres</h3>
            <p style="margin: 0; font-weight: 600; font-size: 16px;">${data.fullAddress}</p>
            <p style="margin: 5px 0 0 0; color: #78716c;">${data.neighborhood}</p>
            ${data.hostPhone ? `<p style="margin: 10px 0 0 0; color: #78716c;">📱 Kontakt do hosta: <strong>${data.hostPhone}</strong></p>` : ''}
          </div>

          <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #44403c;">🍴 Menu</h3>
            <p style="margin: 0;">${data.menuDescription}</p>
            ${data.dietaryOptions.length > 0 ? `
            <p style="margin: 15px 0 0 0; color: #78716c; font-size: 14px;">
              <strong>Opcje dietetyczne:</strong> ${data.dietaryOptions.join(', ')}
            </p>
            ` : ''}
          </div>

          ${data.whatToBring ? `
          <div style="background: #dbeafe; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>🎒 Co zabrać:</strong> ${data.whatToBring}
            </p>
          </div>
          ` : ''}

          ${data.specialInstructions ? `
          <div style="background: #fef3c7; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>ℹ️ Dodatkowe informacje od hosta:</strong><br>
              ${data.specialInstructions}
            </p>
          </div>
          ` : ''}

          <div style="background: #f5f5f4; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #44403c; font-size: 14px;">
              <strong>⏰ Przypomnienie:</strong> Otrzymasz przypomnienie o wydarzeniu 24h i 3h przed rozpoczęciem.
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Ten email został wysłany automatycznie przez platformę Seated.<br>
            © ${new Date().getFullYear()} Seated. Wszystkie prawa zastrzeżone.
          </p>
        </body>
      </html>
    `,
    text: `
Cześć ${data.guestName}!

🎉 REZERWACJA POTWIERDZONA!

${data.hostName} potwierdził/a Twoją rezerwację.

SZCZEGÓŁY WYDARZENIA:
- Wydarzenie: ${data.eventTitle}
- Data: ${data.eventDate}
- Godzina: ${data.eventTime}
- Czas trwania: ~${data.eventDuration} min
- Liczba biletów: ${data.ticketCount}

📍 ADRES:
${data.fullAddress}
${data.neighborhood}
${data.hostPhone ? `Kontakt do hosta: ${data.hostPhone}` : ''}

🍴 MENU:
${data.menuDescription}
${data.dietaryOptions.length > 0 ? `Opcje dietetyczne: ${data.dietaryOptions.join(', ')}` : ''}

${data.whatToBring ? `🎒 CO ZABRAĆ: ${data.whatToBring}` : ''}

${data.paymentLink ? `
💳 DOKOŃCZ PŁATNOŚĆ:
${data.paymentLink}
Kwota: ${data.totalPrice} zł
Masz 24h na dokończenie płatności.
` : ''}

---
Ten email został wysłany automatycznie przez platformę Seated.
    `,
  };
}

/**
 * Email sent when host declines booking
 */
export function bookingDeclined(data: {
  guestName: string;
  eventTitle: string;
  eventDate: string;
  hostName: string;
  reason?: string;
}): EmailTemplate {
  return {
    subject: `Rezerwacja niedostępna - ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706; margin: 0;">🍽️ Seated</h1>
          </div>

          <p>Cześć <strong>${data.guestName}</strong>,</p>

          <p>Niestety, <strong>${data.hostName}</strong> nie mógł/mogła potwierdzić Twojej rezerwacji na wydarzenie <strong>${data.eventTitle}</strong> (${data.eventDate}).</p>

          ${data.reason ? `
          <div style="background: #f5f5f4; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #44403c;">
              <strong>Powód:</strong> ${data.reason}
            </p>
          </div>
          ` : ''}

          <p>Nie martw się! Na Seated znajdziesz wiele innych wspaniałych wydarzeń kulinarnych.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://seated.pl/events" style="display: inline-block; background: #d97706; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">Odkryj inne wydarzenia</a>
          </div>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Ten email został wysłany automatycznie przez platformę Seated.
          </p>
        </body>
      </html>
    `,
    text: `
Cześć ${data.guestName},

Niestety, ${data.hostName} nie mógł/mogła potwierdzić Twojej rezerwacji na wydarzenie ${data.eventTitle} (${data.eventDate}).

${data.reason ? `Powód: ${data.reason}` : ''}

Nie martw się! Na Seated znajdziesz wiele innych wspaniałych wydarzeń kulinarnych.
Odkryj inne wydarzenia: https://seated.pl/events

---
Ten email został wysłany automatycznie przez platformę Seated.
    `,
  };
}

/**
 * Event reminder (24h and 3h before)
 */
export function eventReminder(data: {
  guestName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  fullAddress: string;
  hostName: string;
  hostPhone?: string;
  hoursUntilEvent: number;
}): EmailTemplate {
  const isUrgent = data.hoursUntilEvent <= 3;

  return {
    subject: `${isUrgent ? '⏰' : '📅'} Przypomnienie: ${data.eventTitle} ${isUrgent ? 'za 3 godziny!' : 'jutro'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706; margin: 0;">🍽️ Seated</h1>
          </div>

          <div style="background: ${isUrgent ? '#fef3c7' : '#dbeafe'}; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: ${isUrgent ? '#92400e' : '#1e40af'};">
              ${isUrgent ? '⏰ Już za 3 godziny!' : '📅 Przypomnienie o jutrzejszym wydarzeniu'}
            </h2>
          </div>

          <p>Cześć <strong>${data.guestName}</strong>! 👋</p>

          <p>${isUrgent ? 'Twoje wydarzenie zaczyna się już za 3 godziny!' : 'Przypominamy o jutrzejszym wydarzeniu!'}</p>

          <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0;">${data.eventTitle}</h3>
            <p style="margin: 0;">📅 ${data.eventDate} o ${data.eventTime}</p>
            <p style="margin: 10px 0 0 0;">📍 ${data.fullAddress}</p>
            <p style="margin: 10px 0 0 0;">👨‍🍳 Host: ${data.hostName}</p>
            ${data.hostPhone ? `<p style="margin: 10px 0 0 0;">📱 ${data.hostPhone}</p>` : ''}
          </div>

          <p style="color: #78716c;">Smacznego i do zobaczenia! 🍴</p>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Ten email został wysłany automatycznie przez platformę Seated.
          </p>
        </body>
      </html>
    `,
    text: `
Cześć ${data.guestName}!

${isUrgent ? 'TWOJE WYDARZENIE ZA 3 GODZINY!' : 'PRZYPOMNIENIE O JUTRZEJSZYM WYDARZENIU'}

${data.eventTitle}
📅 ${data.eventDate} o ${data.eventTime}
📍 ${data.fullAddress}
👨‍🍳 Host: ${data.hostName}
${data.hostPhone ? `📱 ${data.hostPhone}` : ''}

Smacznego i do zobaczenia!

---
Ten email został wysłany automatycznie przez platformę Seated.
    `,
  };
}

// ============================================
// HOST EMAILS
// ============================================

/**
 * Email sent to host when new booking request is received
 */
export function newBookingRequest(data: {
  hostName: string;
  guestName: string;
  guestEmail: string;
  eventTitle: string;
  eventDate: string;
  ticketCount: number;
  totalPrice: number;
  dietaryInfo?: string;
  specialRequests?: string;
  dashboardLink: string;
}): EmailTemplate {
  return {
    subject: `🎫 Nowa rezerwacja - ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706; margin: 0;">🍽️ Seated</h1>
          </div>

          <div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: #1e40af;">🎫 Nowa rezerwacja!</h2>
            <p style="margin: 0; color: #1e3a8a;">Ktoś chce dołączyć do Twojego wydarzenia</p>
          </div>

          <p>Cześć <strong>${data.hostName}</strong>! 👋</p>

          <p><strong>${data.guestName}</strong> chce zarezerwować miejsce na wydarzenie <strong>${data.eventTitle}</strong>.</p>

          <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #44403c;">📋 Szczegóły rezerwacji</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Gość:</td>
                <td style="padding: 8px 0; font-weight: 600;">${data.guestName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Email:</td>
                <td style="padding: 8px 0;">${data.guestEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Data wydarzenia:</td>
                <td style="padding: 8px 0;">${data.eventDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Liczba biletów:</td>
                <td style="padding: 8px 0;">${data.ticketCount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Kwota:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #059669;">${data.totalPrice} zł</td>
              </tr>
            </table>
          </div>

          ${data.dietaryInfo ? `
          <div style="background: #fef3c7; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>🥗 Wymagania dietetyczne:</strong><br>
              ${data.dietaryInfo}
            </p>
          </div>
          ` : ''}

          ${data.specialRequests ? `
          <div style="background: #f0fdf4; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #166534;">
              <strong>💬 Specjalne życzenia:</strong><br>
              ${data.specialRequests}
            </p>
          </div>
          ` : ''}

          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.dashboardLink}" style="display: inline-block; background: #d97706; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">Zarządzaj rezerwacjami</a>
          </div>

          <div style="background: #fef3c7; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>⏰ Pamiętaj:</strong> Masz 48 godzin na potwierdzenie lub odrzucenie rezerwacji.
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Ten email został wysłany automatycznie przez platformę Seated.
          </p>
        </body>
      </html>
    `,
    text: `
Cześć ${data.hostName}!

🎫 NOWA REZERWACJA!

${data.guestName} chce zarezerwować miejsce na wydarzenie ${data.eventTitle}.

SZCZEGÓŁY:
- Gość: ${data.guestName}
- Email: ${data.guestEmail}
- Data wydarzenia: ${data.eventDate}
- Liczba biletów: ${data.ticketCount}
- Kwota: ${data.totalPrice} zł

${data.dietaryInfo ? `WYMAGANIA DIETETYCZNE: ${data.dietaryInfo}` : ''}
${data.specialRequests ? `SPECJALNE ŻYCZENIA: ${data.specialRequests}` : ''}

Zarządzaj rezerwacjami: ${data.dashboardLink}

⏰ Pamiętaj: Masz 48 godzin na potwierdzenie lub odrzucenie rezerwacji.

---
Ten email został wysłany automatycznie przez platformę Seated.
    `,
  };
}

/**
 * Email sent to host when payment is confirmed
 */
export function paymentConfirmedHost(data: {
  hostName: string;
  guestName: string;
  eventTitle: string;
  eventDate: string;
  ticketCount: number;
  totalPrice: number;
  platformFee: number;
  hostEarnings: number;
}): EmailTemplate {
  return {
    subject: `💰 Płatność otrzymana - ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706; margin: 0;">🍽️ Seated</h1>
          </div>

          <div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: #166534;">💰 Płatność potwierdzona!</h2>
            <p style="margin: 0; color: #15803d;">Gość opłacił rezerwację</p>
          </div>

          <p>Cześć <strong>${data.hostName}</strong>! 👋</p>

          <p><strong>${data.guestName}</strong> opłacił/a rezerwację na wydarzenie <strong>${data.eventTitle}</strong>.</p>

          <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #44403c;">💵 Szczegóły płatności</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Wydarzenie:</td>
                <td style="padding: 8px 0;">${data.eventTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Data:</td>
                <td style="padding: 8px 0;">${data.eventDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Bilety:</td>
                <td style="padding: 8px 0;">${data.ticketCount}</td>
              </tr>
              <tr style="border-top: 1px solid #e7e5e4;">
                <td style="padding: 8px 0; color: #78716c;">Kwota od gościa:</td>
                <td style="padding: 8px 0;">${data.totalPrice} zł</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Prowizja platformy (10%):</td>
                <td style="padding: 8px 0; color: #dc2626;">-${data.platformFee} zł</td>
              </tr>
              <tr style="border-top: 1px solid #e7e5e4;">
                <td style="padding: 8px 0; font-weight: 600;">Twój zarobek:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #059669; font-size: 18px;">${data.hostEarnings} zł</td>
              </tr>
            </table>
          </div>

          <div style="background: #dbeafe; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>💸 Wypłata:</strong> Środki zostaną przelane na Twoje konto w ciągu 3 dni roboczych po zakończeniu wydarzenia.
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Ten email został wysłany automatycznie przez platformę Seated.
          </p>
        </body>
      </html>
    `,
    text: `
Cześć ${data.hostName}!

💰 PŁATNOŚĆ POTWIERDZONA!

${data.guestName} opłacił/a rezerwację na wydarzenie ${data.eventTitle}.

SZCZEGÓŁY PŁATNOŚCI:
- Wydarzenie: ${data.eventTitle}
- Data: ${data.eventDate}
- Bilety: ${data.ticketCount}
- Kwota od gościa: ${data.totalPrice} zł
- Prowizja platformy (10%): -${data.platformFee} zł
- TWÓJ ZAROBEK: ${data.hostEarnings} zł

Wypłata: Środki zostaną przelane na Twoje konto w ciągu 3 dni roboczych po zakończeniu wydarzenia.

---
Ten email został wysłany automatycznie przez platformę Seated.
    `,
  };
}

/**
 * Email sent to host when guest cancels booking
 */
export function bookingCancelledHost(data: {
  hostName: string;
  guestName: string;
  eventTitle: string;
  eventDate: string;
  ticketCount: number;
  reason?: string;
}): EmailTemplate {
  return {
    subject: `❌ Anulacja rezerwacji - ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706; margin: 0;">🍽️ Seated</h1>
          </div>

          <p>Cześć <strong>${data.hostName}</strong>,</p>

          <p><strong>${data.guestName}</strong> anulował/a rezerwację na wydarzenie <strong>${data.eventTitle}</strong> (${data.eventDate}).</p>

          <div style="background: #f5f5f4; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0;">
              <strong>Zwolnione miejsca:</strong> ${data.ticketCount}
            </p>
          </div>

          ${data.reason ? `
          <div style="background: #fef3c7; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>Powód anulacji:</strong> ${data.reason}
            </p>
          </div>
          ` : ''}

          <p style="color: #78716c;">Te miejsca są teraz dostępne dla innych gości.</p>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Ten email został wysłany automatycznie przez platformę Seated.
          </p>
        </body>
      </html>
    `,
    text: `
Cześć ${data.hostName},

${data.guestName} anulował/a rezerwację na wydarzenie ${data.eventTitle} (${data.eventDate}).

Zwolnione miejsca: ${data.ticketCount}
${data.reason ? `Powód anulacji: ${data.reason}` : ''}

Te miejsca są teraz dostępne dla innych gości.

---
Ten email został wysłany automatycznie przez platformę Seated.
    `,
  };
}

// ============================================
// ADMIN/SYSTEM EMAILS
// ============================================

/**
 * Host application received confirmation
 */
export function hostApplicationReceived(data: {
  hostName: string;
  applicationId: string;
}): EmailTemplate {
  return {
    subject: `✅ Otrzymaliśmy Twoją aplikację na hosta - Seated`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706; margin: 0;">🍽️ Seated</h1>
          </div>

          <div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 10px 0; color: #166534;">✅ Aplikacja otrzymana!</h2>
          </div>

          <p>Cześć <strong>${data.hostName}</strong>! 👋</p>

          <p>Dziękujemy za złożenie aplikacji na hosta platformy Seated! Jesteśmy podekscytowani możliwością współpracy z Tobą.</p>

          <div style="background: #f5f5f4; border-radius: 12px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #44403c;">
              <strong>Numer aplikacji:</strong> ${data.applicationId}
            </p>
          </div>

          <h3>Co dalej?</h3>
          <ol style="color: #44403c;">
            <li>Nasz zespół przejrzy Twoją aplikację w ciągu <strong>48 godzin</strong></li>
            <li>Skontaktujemy się z Tobą, aby umówić <strong>krótką rozmowę weryfikacyjną</strong></li>
            <li>Po pozytywnej weryfikacji, będziesz mógł/mogła tworzyć wydarzenia!</li>
          </ol>

          <p style="color: #78716c;">Masz pytania? Odpisz na tego emaila, a chętnie pomożemy.</p>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Ten email został wysłany automatycznie przez platformę Seated.
          </p>
        </body>
      </html>
    `,
    text: `
Cześć ${data.hostName}!

✅ APLIKACJA OTRZYMANA!

Dziękujemy za złożenie aplikacji na hosta platformy Seated!

Numer aplikacji: ${data.applicationId}

CO DALEJ?
1. Nasz zespół przejrzy Twoją aplikację w ciągu 48 godzin
2. Skontaktujemy się z Tobą, aby umówić krótką rozmowę weryfikacyjną
3. Po pozytywnej weryfikacji, będziesz mógł/mogła tworzyć wydarzenia!

Masz pytania? Odpisz na tego emaila, a chętnie pomożemy.

---
Ten email został wysłany automatycznie przez platformę Seated.
    `,
  };
}

/**
 * Host application approved
 */
export function hostApplicationApproved(data: {
  hostName: string;
  dashboardLink: string;
}): EmailTemplate {
  return {
    subject: `🎉 Gratulacje! Zostałeś hostem Seated`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1c1917; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d97706; margin: 0;">🍽️ Seated</h1>
          </div>

          <div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
            <h2 style="margin: 0 0 10px 0; color: #166534; font-size: 24px;">🎉 Gratulacje!</h2>
            <p style="margin: 0; color: #15803d; font-size: 18px;">Zostałeś oficjalnym hostem Seated</p>
          </div>

          <p>Cześć <strong>${data.hostName}</strong>! 👋</p>

          <p>Z ogromną przyjemnością informujemy, że Twoja aplikacja została <strong>zaakceptowana</strong>! Witamy w społeczności hostów Seated.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.dashboardLink}" style="display: inline-block; background: #d97706; color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Stwórz swoje pierwsze wydarzenie</a>
          </div>

          <h3>Porady na start:</h3>
          <ul style="color: #44403c;">
            <li>Dodaj atrakcyjne zdjęcia swoich potraw</li>
            <li>Opisz szczegółowo menu i atmosferę</li>
            <li>Zacznij od mniejszej grupy (6-8 osób)</li>
            <li>Odpowiadaj szybko na zapytania gości</li>
          </ul>

          <p style="color: #78716c;">Powodzenia i smacznych wydarzeń! 🍴</p>

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 30px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Ten email został wysłany automatycznie przez platformę Seated.
          </p>
        </body>
      </html>
    `,
    text: `
Cześć ${data.hostName}!

🎉 GRATULACJE! ZOSTAŁEŚ HOSTEM SEATED!

Z ogromną przyjemnością informujemy, że Twoja aplikacja została zaakceptowana! Witamy w społeczności hostów Seated.

Stwórz swoje pierwsze wydarzenie: ${data.dashboardLink}

PORADY NA START:
- Dodaj atrakcyjne zdjęcia swoich potraw
- Opisz szczegółowo menu i atmosferę
- Zacznij od mniejszej grupy (6-8 osób)
- Odpowiadaj szybko na zapytania gości

Powodzenia i smacznych wydarzeń!

---
Ten email został wysłany automatycznie przez platformę Seated.
    `,
  };
}
