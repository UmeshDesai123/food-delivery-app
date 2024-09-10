import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Roles & Document;

@Schema()
export class Roles {
  @Prop()
    roleId: string;
	
	@Prop()
	  role: string;

}

export const RoleSchema = SchemaFactory.createForClass(Roles);

