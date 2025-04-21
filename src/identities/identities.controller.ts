import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IdentitiesService } from './identities.service';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import { CreateDIDDto } from 'src/energy/create-did.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('identities')
@UseGuards(AuthGuard('basic'))
export class IdentitiesController {
  constructor(private readonly identitiesService: IdentitiesService) {}

  @Post()
  create(@Body() createDIDDto: CreateDIDDto) {
    return this.identitiesService.create(createDIDDto);
  }

  @Get()
  findAll() {
    return this.identitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.identitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIdentityDto: UpdateIdentityDto,
  ) {
    return this.identitiesService.update(+id, updateIdentityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.identitiesService.remove(+id);
  }
}
