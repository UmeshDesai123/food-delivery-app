import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class UpdateOrderDto {
  // @IsString()
  //   orderId: string;

  // @IsString()
  //   employeeId: string;
  
  @ApiProperty({ example: '123', type: String, description: 'Id of the order' })
	@IsString()
	  orderStatus: string;
	
}