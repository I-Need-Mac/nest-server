import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindRewardBoxDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;
}

export class RewardBoxOpenDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;
}
