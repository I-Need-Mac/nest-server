import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class updateCharacterDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: '캐릭터명' })
  @IsString()
  character: string;
}

export class initializeCharacterDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;
}
