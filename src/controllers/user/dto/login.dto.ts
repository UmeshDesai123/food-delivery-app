import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
	@IsString()
	@ApiProperty({ example: 'rohit.sharma@example.com', type: String, description: 'email of the user' })
	  username: string;

	@IsString()
	@ApiProperty({ example: 'asdfg', type: String, description: 'password of the user' })
	  password: string;
}