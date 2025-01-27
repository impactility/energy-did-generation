import { Module } from '@nestjs/common';
import { EnergyController } from './energy.controller';
import { EnergyService } from './energy.service';
import { EnergyIdData, EnergyIdDataSchema } from './energyIdData.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EnergyIdData.name,
        schema: EnergyIdDataSchema,
        collection: 'energy_id_data',
      },
    ]),
  ],
  controllers: [EnergyController],
  providers: [EnergyService],
})
export class EnergyModule {}
