import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, isString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: '스팀아이디' })
  @IsString()
  steam_id: string;

  @ApiProperty({ description: '닉네임' })
  @IsString()
  name: string;
}

export class CheckDuplicatedDto {
  @IsString()
  name: string;
}
