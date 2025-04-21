import { IsBoolean, IsObject, IsString } from 'class-validator';

export class CreateCredentialDto {
  @IsString()
  credentialSchema: string;

  @IsObject()
  credentialSubject: Record<string, any>;

  @IsBoolean()
  mtProof: boolean;

  @IsBoolean()
  signatureProof: boolean;

  @IsString()
  type: string;
}
