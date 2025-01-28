import { Controller, Get, Ip, UseGuards } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('energy')
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Get()
  @UseGuards(AuthGuard('basic'))
  getEnergyDid(@Ip() ip): any {
    return this.energyService.getEnergyDid(ip);
  }
}
