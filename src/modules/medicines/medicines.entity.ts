import { IsObject } from 'class-validator';

export class RegisterDto {
  @IsObject()
  data: any;
}
