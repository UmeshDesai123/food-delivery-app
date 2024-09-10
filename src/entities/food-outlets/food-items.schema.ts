import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodItemsDocument = FoodItems & Document;

@Schema()
export class FoodItems {

	@Prop()
	  itemId: string;

	@Prop()
	  name: string;

	@Prop()
	  price: number;
	
  @Prop()
    images: string[];

	@Prop()
	  category: string;
}

export const FoodItemsSchema = SchemaFactory.createForClass(FoodItems);