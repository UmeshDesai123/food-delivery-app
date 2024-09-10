import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface UserPayload {
	userId: string;
	userName: string;
	email: string;
	role: string;
}

@Injectable()
export class AuthService {
	
  constructor (
			private readonly jwtService: JwtService,
			
  ) {}

  generateToken (payload: UserPayload): string {

    return this.jwtService.sign(payload);//payload -> info what you want to store in token
  }
}