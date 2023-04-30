import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateStageDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  name: string;

  @ApiProperty({ description: '스테이지' })
  @IsNumber()
  stage: number;

  @ApiProperty({ description: '대분류 소울' })
  @IsNumber()
  saint_soul: number;

  @ApiProperty({ description: '소분류 소울 리스트' })
  @IsNumber({}, { each: true })
  soul: number[];
}
