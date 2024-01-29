// email/email.controller.ts
import { Controller, Post, Body, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('/send')
  async sendEmails(@Body() userData: any[]): Promise<any> {
    if (!userData || !Array.isArray(userData) || userData.length === 0) {
      return { status: 400, message: 'Invalid user data' };
    }

    const emailPromises = userData.map(async (user) => {
      const templateName = `template${user.category}`;
      const templateData = {
        user,
      };

      // Send email
      await this.emailService.sendEmail(user.email, 'Custom Subject', templateName, templateData);
    });

    await Promise.all(emailPromises);

    return { status: 200, message: 'Emails sent successfully' };
  }

  @Post('/sendmailrange')
  async sendEmailsRange(
    @Body() userData: any[],
    @Query('start') start?: number,
    @Query('end') end?: number,
  ): Promise<any> {
    if (!userData || !Array.isArray(userData) || userData.length === 0) {
      return { status: 400, message: 'Invalid user data' };
    }

    let startIndex = start || 0;
    let endIndex = end || userData.length;

    if (startIndex < 0 || endIndex > userData.length || startIndex >= endIndex) {
      return { status: 400, message: 'Invalid start or end indices' };
    }

    const batch = userData.slice(startIndex, endIndex);

    const emailPromises = batch.map(async (user) => {
      const templateName = `template${user.category}`;
      const templateData = {
        user,
      };

      await this.emailService.sendEmail(user.email, 'Custom Subject', templateName, templateData);
    });

    await Promise.all(emailPromises);

    return { status: 200, message: 'Emails sent successfully' };
  }

}
