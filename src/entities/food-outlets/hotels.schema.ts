import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotels & Document;

@Schema()
export class Hotels {
  @Prop()
    hotelId: string;

  @Prop()
    hotelName: string;
  
  @Prop()
    address: string;

	@Prop()
	  foodItems: string[];
  
}

export const HotelsSchema = SchemaFactory.createForClass(Hotels);

