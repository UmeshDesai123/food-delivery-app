import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrdersDocument = Orders & Document;

@Schema()
export class Orders {
  @Prop()
    orderId: string;

  @Prop()
    hotelId: string;
  
  @Prop()
    customerId: string;

	@Prop()
	  employeeId: string;

	@Prop()
	  orderStatus: string;

	@Prop()
	  items: OrderItems[];
  
}

export class OrderItems {
	@Prop()
	  itemId: string;

	@Prop()
	  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);

