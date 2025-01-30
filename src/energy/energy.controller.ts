import { Body, Controller, Ip, Post, UseGuards } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDIDDto } from './create-did.dto';

@Controller('energy')
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  getEnergyDid(@Ip() ip, @Body() createDIDDto: CreateDIDDto): any {
    return this.energyService.getEnergyDid(
      ip,
      createDIDDto.issuedFor,
      createDIDDto.cobaltPUniqueId,
    );
  }
}
