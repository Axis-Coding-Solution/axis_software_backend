import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LOCATION_MODEL, LocationSchema } from '@/schemas/commons/location';

@Module({
  imports: [MongooseModule.forFeature([{ name: LOCATION_MODEL, schema: LocationSchema }])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
