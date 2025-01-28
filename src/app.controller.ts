import { Controller, Get, Ip, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('basic'))
  getHello(@Ip() ip): string {
    console.log('ip', ip);
    return this.appService.getHello();
  }
}
