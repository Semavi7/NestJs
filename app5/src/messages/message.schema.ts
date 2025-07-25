import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/users.schema';

export type MessageDocument = Message & Document;
@Schema()
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  from: User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  to: User;

  @Prop()
  read: boolean;
}
export const MessageSchema = SchemaFactory.createForClass(Message);