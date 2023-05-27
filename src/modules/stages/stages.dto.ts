import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, isNumber } from 'class-validator';

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

  @ApiProperty({ description: '캐릭터명' })
  @IsString()
  character: string;

  @ApiProperty({ description: '열쇠' })
  @IsNumber()
  key: number;

  @ApiProperty({ description: '소분류 소울 리스트' })
  @IsNumber({}, { each: true })
  soul: number[];
}

export class UpdateStageDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: '스테이지 아이디' })
  @IsNumber()
  stage_id: number;

  @ApiProperty({ description: '성공여부' })
  @IsBoolean()
  is_clear: boolean;

  @ApiProperty({ description: '플레이 시간' })
  @IsNumber()
  paly_time: number;

  @ApiProperty({ description: '보상박스' })
  @IsNumber({}, { each: true })
  reward_box: number[];
}
