// email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { join } from 'path';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configure your email provider settings here (e.g., SMTP, SendGrid, etc.)
      // Example for Gmail SMTP:
      // host: 'smtp.gmail.com',
      // port: 465,
      // service: 'gmail',
      // auth: {
      //   user: 'darklegend12000@gmail.com',
      //   pass: 'nfkn pzqc fahl rynw',
      // },
      host: process.env.EMAIL_HOST,
      port: 465,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    templateName: string,
    templateData: any,
  ): Promise<void> {
    // Load EJS template file based on templateName
    // const templatePath = join(__dirname, 'templates', `${templateName}.ejs`);
    const templatePath = './src/email/templates/templateCategory1.ejs';
    const template = await ejs.renderFile(templatePath, templateData);

    const mailOptions: nodemailer.SendMailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      html: template,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
