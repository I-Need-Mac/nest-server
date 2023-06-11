import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FindRewardBoxDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;
}

export class RewardBoxOpenStartDto {
  @ApiProperty({ description: 'reward box 아이디' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;
}
