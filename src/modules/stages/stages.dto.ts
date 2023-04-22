import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateStageDto {
  @IsString()
  steam_id: number;

  @IsString()
  name: string;

  @IsNumber()
  stage: number;

  @IsNumber()
  saint_soul: number;

  @IsArray()
  soul: [];
}
