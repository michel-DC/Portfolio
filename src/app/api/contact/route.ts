import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, message } = body;

    // Validation basique
    if (!firstname || !lastname || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["djoumessi.michel08@gmail.com"],
      replyTo: email,
      subject: `Nouveau message de ${firstname} ${lastname}`,
      html: `
         <!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ton portfolio - Nouveau message de contact</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        font-family: Arial, sans-serif;
        color: #020102;
      }
      table { border-spacing: 0; border-collapse: collapse; }
      img { display: block; border: 0; }
      a { text-decoration: none; }
      h1 { font-size: 26px; line-height: 1.3; margin: 0; }
      p  { font-size: 16px; line-height: 1.6; margin: 0; color:#4b5563; }
      .email-header-image-dark { display: block; }
      .email-header-image-light { display: none; }
      .email-footer-image-dark { display: inline-block; }
      .email-footer-image-light { display: none; }
      @media (prefers-color-scheme: dark) {
        .email-header-image-dark { display: none !important; }
        .email-header-image-light { display: block !important; }
        .email-footer-image-dark { display: none !important; }
        .email-footer-image-light { display: inline-block !important; }
      }
      @media screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .content-padding { padding: 20px !important; }
        h1 { font-size: 22px !important; }
        p  { font-size: 14px !important; }
      }
    </style>
  </head>
  <body>
    <table role="presentation" width="100%" bgcolor="#f9f9f9">
      <!-- Bandeau logo hors carte -->
      <tr>
        <td align="center" style="padding:24px 0 12px;">
          <table role="presentation" width="600" class="container" style="max-width:600px;">
            <tr>
              <td align="left" style="padding:0 16px;">
                <img src="https://onlinemichel.dev/images/svg/logo-noir.png"
                     alt="Michel logo"
                     width="120"
                     class="email-header-image-dark" style="display: block;">
                <img src="https://onlinemichel.dev/images/svg/logo-noir.png"
                     alt="Michel logo"
                     width="120"
                     class="email-header-image-light" style="display: none;">
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Carte de contenu -->
      <tr>
        <td align="center" style="padding:12px 0 24px;">
          <table role="presentation" width="600" class="container" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.05);">
            <!-- Contenu spécifique -->
            <tr>
              <td class="content-padding" style="padding:32px; text-align:left; background:#ffffff;">
                <h1 style="margin:0 0 16px; color:#020102;">Nouveau message depuis ton portfolio,</h1>
                <p style="margin:0 0 24px;">
                  Un prospect vous a envoyé une demande via le formulaire de contact. Voici les détails :
                </p>

                <!-- Détails -->
                <div style="margin:0 0 24px;">
                  <p style="margin:0 0 8px;"><strong>Message de:</strong> ${firstname} ${lastname}</p>
                  <p style="margin:0 0 8px;"><strong>Email :</strong> <a href="mailto:${email}" style="text-decoration: none;">${email}</a></p>
                  <p style="margin:0 0 8px;"><strong>Message :</strong> ${message}</p>
                </div>

                <!-- CTA -->
                <div style="margin:24px 0 0;">
                  <a href="mailto:${email}"
                     style="
                       display:block;
                       width:calc(100% - 48px);
                       text-align:center;
                       background-color:#008366;
                       color:#ffffff;
                       padding:14px 24px;
                       border-radius:9999px;
                       font-weight:600;
                       font-size:16px;
                       margin:0 auto;
                     ">
                    Répondre par email
                  </a>
                  
                </div>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="padding:32px 32px 20px 32px; font-size:9px; color:#6b7280; background-color:#f9f9f9;">
                <a href="https://onlinemichel.dev" style="display:inline-block; margin-bottom:16px;">
                  <img src="https://onlinemichel.dev/images/svg/logo-noir.png"
                       alt="Michel logo"
                       width="80"
                       class="email-footer-image-dark" style="display: inline-block;">
                  <img src="https://onlinemichel.dev/images/svg/logo-noir.png"
                       alt="Michel logo"
                       width="80"
                       class="email-footer-image-light" style="display: none;">
                </a>
                <p style="margin:0 0 10px 0; text-align:left;">
                  Cet email a été envoyé automatiquement, suite à une demande de contact via le formulaire de votre site internet. Pour ne plus recevoir d'invitations, ajustez vos préférences de notification.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
