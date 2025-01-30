import { identityCreation } from './identity';
import { generateSeedPhrase } from 'near-seed-phrase';
import { EnergyIdData } from './energyIdData.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EnergyService {
  constructor(
    @InjectModel(EnergyIdData.name)
    private energyIdDataModel: Model<EnergyIdData>,
  ) {}

  async getEnergyDid(
    ip: string,
    issuedFor: string,
    cobaltPUniqueId: string,
  ): Promise<any> {
    const mySeedPhrase = generateSeedPhrase();

    console.log('issuedFor: ', issuedFor);
    // Eg. ed25519:2htvg4kn2Ps6NHiUaismbx6Zu1ZmnQm1Jx2kb2yyDedaawcPLZfcv4djc8BCxiutdHjPJZNUwoHyrmqwo5gYyEFv
    // We need 32 bytes of secret key for creating a DID. we are taking 32 bytes from 8th to 40th byte.
    const secretForDid = mySeedPhrase.secretKey.slice(8, 40);

    const { did, credential } = await identityCreation(secretForDid);

    const newEnergyIdData = new this.energyIdDataModel({
      did: did.toJSON(),
      credential: JSON.stringify(credential),
      privateInfo: mySeedPhrase,
      requestIp: ip,
      issuedFor: issuedFor,
      cobaltPUniqueId: cobaltPUniqueId,
    });

    await newEnergyIdData.save();

    return did;
  }
}
