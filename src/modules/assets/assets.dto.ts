import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class updateAssetKeyDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: 'key 개수' })
  @IsNumber()
  key: number;
}

export class getAssetsDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;
}
