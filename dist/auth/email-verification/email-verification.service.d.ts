import { User } from 'src/entities/user/user.schema';
export declare class EmailVerification {
    mailerService: any;
    sendVerificationEmail(user: User): Promise<void>;
}
