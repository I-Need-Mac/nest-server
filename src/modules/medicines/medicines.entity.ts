import { IsObject, IsString } from 'class-validator';

export class DecryptDto {
  @IsString()
  data: string;
}

export class EncrpytDto {
  @IsObject()
  data: any;
}
