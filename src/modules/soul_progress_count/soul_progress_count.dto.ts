import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProgressDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: '하위 소울 ID' })
  @IsNumber()
  souls_id: number;

  @ApiProperty({ description: '진척도 배열 (soul1 ~ soul18까지 순차적으로 넣어주세요)' })
  @IsArray()
  now_count_list: number;
}
export class SelectProgressDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: 'saint soul ID', required: false })
  @IsOptional()
  souls_id: number | null;
}
