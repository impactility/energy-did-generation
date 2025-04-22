import { Module } from '@nestjs/common';
import { IdentitiesService } from './identities.service';
import { IdentitiesController } from './identities.controller';
import { EnergyModule } from 'src/energy/energy.module';

@Module({
  imports: [EnergyModule],
  controllers: [IdentitiesController],
  providers: [IdentitiesService],
})
export class IdentitiesModule {}
