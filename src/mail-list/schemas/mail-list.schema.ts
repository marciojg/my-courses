import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';

@Schema()
export class MailList {
  @Prop({ type: MongooSchema.Types.ObjectId })
  id: string;

  @Prop({ type: [String] })
  emails: string[];
}

export type MailListDocument = MailList & Document;

export const MailListSchema = SchemaFactory.createForClass(MailList);
