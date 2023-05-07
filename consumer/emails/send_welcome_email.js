import nodemailer from "nodemailer";


export default class SendWelcomeEmail {
  constructor(email) {
    this.email = email;
    this.subject = "Welcome Email";

    this.transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send() {
    await this.transport.sendMail({
      to: this.email,
      subject: this.subject,
      from: process.env.EMAIL_FROM,
      html: "<p>Welcome Email</p>",
    });
  }
}
