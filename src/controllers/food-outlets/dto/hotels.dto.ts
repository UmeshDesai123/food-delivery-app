import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class HotelsDto {

	@ApiProperty({ example: 'Taj', type: String, description: 'Name of the hotel' })
	@IsString()
	  hotelName: string;

	@ApiProperty({ example: 'Pune', type: String, description: 'Address of the hotel' })
	@IsString()
	  address: string;

	@ApiProperty({ example: ['1234'], type: [String], description: 'Id of the food item' })
	@IsArray()
	@IsString({ each: true })
	  foodItems: string[];
}

