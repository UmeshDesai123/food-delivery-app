import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateEmployeeDetailsDto {
	@IsString()
	@ApiProperty({ example: '1234', type: String, description: 'user id of the user' })
	  userId: string;

	@IsString()
	@ApiProperty({ example: '1234', type: String, description: 'RoleId of role' })
	  role: string;

  // @IsString()
  //   empAvailabilityStatus: string;

  // @IsString()
  //   empCurrentLocation: string;
}