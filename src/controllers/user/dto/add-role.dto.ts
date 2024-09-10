import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddRoleDto {
	@ApiProperty({ example: 'Customer', type: String, description: 'role for the user' })
	@IsString()
	  role: string;
}