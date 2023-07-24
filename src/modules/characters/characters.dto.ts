import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class updateCharacterDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: '캐릭터명' })
  @IsString()
  character: string;

  @ApiProperty({ description: '키 개수' })
  @IsNumber()
  key: number;
}
