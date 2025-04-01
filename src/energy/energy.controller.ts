import { Body, Controller, Ip, Post, UseGuards } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateDIDDto } from './create-did.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('energy')
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  async getEnergyDid(
    @Ip() ip,
    @Body() createDIDDto: CreateDIDDto,
  ): Promise<any> {
    try {
      return await this.energyService.getEnergyDid(
        ip,
        createDIDDto.issuedFor,
        createDIDDto.cobaltPUniqueId,
      );
    } catch (error) {
      return Promise.reject({
        statusCode: 500,
        message: error.message,
      });
    }
  }
}
