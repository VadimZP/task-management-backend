import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class EmailService {
  constructor(private emailClient: typeof nodemailer) {
    this.emailClient = emailClient;
  }

  async sendEmail(data: Mail.Options) {
    const transporter = this.emailClient.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dev634556@gmail.com",
        pass: "lkgk nuyt lzjc bldx",
      },
    });

    return await transporter.sendMail(data);
  }
}
