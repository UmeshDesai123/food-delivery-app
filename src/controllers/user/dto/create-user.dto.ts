import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
// @IsString()
//   userId: string;
@IsString()
@ApiProperty({ example: 'Rohit Sharma', type: String, description: 'Name of the user' })
  userName: string;

@IsString()
@IsEmail()
@ApiProperty({ example: 'rohit.sharma@example.com', type: String, description: 'email id of the user' })
  email: string;

@IsString()
@ApiProperty({ example: 'asdfg', type: String, description: 'password of the user' })
  password: string;

@IsBoolean()
@ApiProperty({ example: false, type: Boolean, description: 'Willingness of user to become employee' })
  isEmployee: string;

@IsString()
@ApiProperty({ example: 'Pune', type: String, description: 'Address of the user' })
  address : string;
}
