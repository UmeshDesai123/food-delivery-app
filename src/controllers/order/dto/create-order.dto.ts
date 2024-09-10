import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateOrderDto {
	@ApiProperty({ example: '123', type: String, description: 'Id of the hotel' })
	@IsString()
	  hotelId: string;
  
	@ApiProperty({ example: '123', type: String, description: 'Id of the customer' })
  @IsString()
	  customerId: string;

	@ApiProperty({ example: [{ itemId: '123', quantity: 1 }], type: [Object], description: 'Id of the ordered items and quantity' })
	@IsArray()
	@ValidateNested({ each: true })
	  items: OrderedItems[];
}

export class OrderedItems {
	@ApiProperty({ example: '123', type: String, description: 'Id of the food item' })
	@IsString()
	  itemId: string;

	@ApiProperty({ example: 1, type: Number, description: 'Quantity of food item' })
	@IsNumber()
	  quantity: number;
}