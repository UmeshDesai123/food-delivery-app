import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user/user.schema';

@Injectable()
export class EmailVerification {
  mailerService: any;

  async sendVerificationEmail (user: User) {
    // Generate a verification token (can be a random string or a JWT token)

    // Example: Generating a random verification token
    const verificationToken = Math.random();

    // Update the user's verification token in the database
    

    // Send the verification email
    const verificationUrl = `https://example.com/verify-email?token=${verificationToken}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: ${verificationUrl}`
    });
  }
}