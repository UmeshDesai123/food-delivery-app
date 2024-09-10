import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEmpStatus {
	@ApiProperty({ example: 'available', type: String, description: 'Status of employee' })
	@IsString()
	  empAvailabilityStatus: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ example: 'Pune', type: String, description: 'Current location of employee' })
	  empCurrentLocation: string;
}