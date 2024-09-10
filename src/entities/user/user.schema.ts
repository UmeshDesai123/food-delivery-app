import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
    userId: string;

  @Prop()
    userName: string;

  @Prop({ unique: true })
    email: string;

  @Prop()
    password: string;

  @Prop()
    isEmployee: boolean;

  @Prop({ default: 'Customer' })
    role: string;

  @Prop()
    address: string;

  @Prop({ default: false })
    isEmailVerified: boolean;

  @Prop()
    verificationOTP: number;

  @Prop()
  @ApiProperty({ example: 'available', type: String, description: 'Give preffered status' })
    empAvailabilityStatus: string;

  @Prop()
  @ApiProperty({ example: 'Pune', type: String, description: 'Currenet location of the user' })
    empCurrentLocation: string;
	
}

export const UserSchema = SchemaFactory.createForClass(User);

