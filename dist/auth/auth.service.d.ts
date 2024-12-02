import { JwtService } from '@nestjs/jwt';
interface UserPayload {
    userId: string;
    userName: string;
    email: string;
    role: string;
}
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(payload: UserPayload): string;
}
export {};
