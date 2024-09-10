import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class FoodItemsDto {
	@ApiProperty({ example: 'Paneer', type: String, description: 'Name of the food item' })
	@IsString()
	  name: string;

	@ApiProperty({ example: 300, type: String, description: 'Price of the food item' })
	@IsNumber()
	  price: number;

	@ApiProperty({ example: ['Image URLs'], type: [String], description: 'Images of the food item' })
	@IsArray()
	  images: string[];

	@ApiProperty({ example: 'veg', type: String, description: 'Category of the food item' })
	@IsString()
	  category: string;
}