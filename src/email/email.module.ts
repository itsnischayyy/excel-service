// email/email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller'; // Add this line

@Module({
  controllers: [EmailController], // Add this line
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
