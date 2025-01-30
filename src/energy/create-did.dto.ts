import { IsEnum, IsString } from 'class-validator';

export enum IssuedFor {
  User = 'User',
  Battery = 'Battery',
}

export class CreateDIDDto {
  @IsEnum(IssuedFor)
  issuedFor: IssuedFor;

  @IsString()
  cobaltPUniqueId: string;
}
