import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EnergyIdData extends Document {
  @Prop({ required: true })
  did: string;

  @Prop({ required: true })
  credential: string;

  @Prop({ required: true, type: Object })
  privateInfo: {
    seedPhrase: string;
    secretKey: string;
    publicKey: string;
  };

  @Prop({ required: true, default: Date.now })
  created_at: Date;
}

export const EnergyIdDataSchema = SchemaFactory.createForClass(EnergyIdData);
