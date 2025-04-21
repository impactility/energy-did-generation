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
import { CreateCredentialDto } from './dto/create-credential.dto';

@Controller('identities')
@UseGuards(AuthGuard('basic'))
export class IdentitiesController {
  constructor(private readonly identitiesService: IdentitiesService) {}

  @Post('/')
  createIdentities(@Body() createDIDDto: CreateDIDDto) {
    return this.identitiesService.createIdentities(createDIDDto);
  }

  @Post('/:identifier/credentials')
  createCredential(
    @Param('identifier') identifier: string,
    @Body() createCredentialDto: CreateCredentialDto,
  ) {
    return this.identitiesService.createCredential(
      identifier,
      createCredentialDto,
    );
  }

  @Get('/:identifier/credentials')
  getCredentials(@Param('identifier') identifier: string) {
    return this.identitiesService.getCredentials(identifier);
  }

  @Post('/:identifier/credentials/revoke/:nonce')
  revokeCredential(
    @Param('identifier') identifier: string,
    @Param('nonce') nonce: string,
  ) {
    return this.identitiesService.revokeCredential(identifier, nonce);
  }

  @Get('/:identifier/credentials/:id')
  getCredential(
    @Param('identifier') identifier: string,
    @Param('id') id: string,
  ) {
    return this.identitiesService.getCredential(identifier, id);
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
