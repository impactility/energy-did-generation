import { HttpException, Injectable } from '@nestjs/common';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import { EnergyService } from '../energy/energy.service';
import { CreateDIDDto, IssuedFor } from 'src/energy/create-did.dto';
import { axiosClient } from './axios-client';

@Injectable()
export class IdentitiesService {
  constructor(private readonly energyService: EnergyService) {}

  create(createDIDDto: CreateDIDDto) {
    console.log('createDIDDto: ', createDIDDto);

    if (createDIDDto.issuedFor === IssuedFor.Battery) {
      return this.energyService.getEnergyDid(
        createDIDDto.issuedFor,
        createDIDDto.cobaltPUniqueId,
      );
    } else if (createDIDDto.issuedFor === IssuedFor.User) {
      return axiosClient
        .post('/v2/identities', {
          didMetadata: {
            method: 'energy',
            blockchain: 'energyweb',
            network: 'volta',
            type: 'BJJ',
          },
          credentialStatusType: 'Iden3commRevocationStatusV1.0',
          displayName: `Issuer : ${createDIDDto.cobaltPUniqueId}`,
        })
        .then((response) => response.data)
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'Unknown error occurred';
          console.error('Error calling identities API:', errorMessage);
          throw new HttpException(
            `Failed to create identity for user. Error : ${errorMessage}`,
            error.response?.status || 500,
          );
        });
    }
  }

  findAll() {
    return `This action returns all identities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} identity`;
  }

  update(id: number, updateIdentityDto: UpdateIdentityDto) {
    return `This action updates a #${id} identity`;
  }

  remove(id: number) {
    return `This action removes a #${id} identity`;
  }
}
