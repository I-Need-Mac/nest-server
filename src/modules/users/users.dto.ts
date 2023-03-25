import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  steam_id: string;

  @IsString()
  name: string;
}
