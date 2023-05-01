import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  steam_id: number;

  @IsString()
  name: string;
}

export class CheckDuplicatedDto {
  @IsString()
  name: string;
}
