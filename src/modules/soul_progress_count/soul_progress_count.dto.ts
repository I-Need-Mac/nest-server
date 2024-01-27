import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProgressDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: '하위 소울 ID' })
  @IsNumber()
  souls_id: number;

  @ApiProperty({ description: 'soul 소분류 명 (ex. soul1)' })
  @IsString()
  soul_name: string;

  @ApiProperty({ description: '현재 카운트' })
  @IsNumber()
  now_count: number;

  @ApiProperty({ description: '최대 카운트' })
  @IsNumber()
  max_count: number;
}
