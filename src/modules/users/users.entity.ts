import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class Asset extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '스팀 아이디',
  })
  stream_id!: number;

  @Column({
    type: 'varchar',
    comment: '닉네임',
  })
  name: string;

  @Column({
    type: 'int',
    comment: '1: 관리자, 2: 일반 유저',
  })
  admin_level: number;

  @Column({
    type: 'bool',
    comment: 'true: 사용, false: 미사용',
  })
  is_use: boolean;
}
