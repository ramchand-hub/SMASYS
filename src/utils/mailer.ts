import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST?.trim();
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER?.trim();
const SMTP_PASS = process.env.SMTP_PASS?.replace(/\s+/g, "").trim();
const SMTP_FROM = process.env.SMTP_FROM?.trim() || SMTP_USER || "no-reply@smasys.local";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth:
    SMTP_USER && SMTP_PASS
      ? {
          user: SMTP_USER,
          pass: SMTP_PASS,
        }
      : undefined,
});

export const sendLoginWelcomeEmail = async (to: string, name: string) => {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("SMTP is not configured. Skipping welcome email.");
    return;
  }

  const loginTime = new Date().toLocaleString();

  await transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject: "Welcome to SMASYS - Login Successful",
    text: `Hello ${name},\n\nWelcome to SMASYS! Your login was successful on ${loginTime}.\n\nIf this login was not performed by you, please reset your password immediately and contact support.\n\nThank you,\nSMASYS Team`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background: #f9fafb; padding: 24px; color: #1f2937;">
        <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 24px;">
          <h2 style="margin: 0 0 12px; color: #111827;">Welcome to SMASYS, ${name}!</h2>
          <p style="margin: 0 0 12px;">Your login was successful.</p>
          <p style="margin: 0 0 16px;"><strong>Login time:</strong> ${loginTime}</p>
          <p style="margin: 0 0 16px;">If this login was not performed by you, please reset your password immediately and contact support.</p>
          <p style="margin: 0;">Thank you,<br/>SMASYS Team</p>
        </div>
      </div>
    `,
  });
};
