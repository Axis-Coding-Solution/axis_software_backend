import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true, unique: true })
  locationName: string;

  @Prop()
  longitude?: string;

  @Prop()
  latitude?: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  isActive: boolean;
}

export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
export const LOCATION_MODEL = Location.name;
