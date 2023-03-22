import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity('stage')
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
    type: 'int',
    comment: '스테이지 종류',
  })
  stage: number;

  @Column({
    type: 'bool',
    comment: '게임 진행 중 여부',
  })
  is_finished: boolean;

  @Column({
    type: 'bool',
    comment: '클리어 여부',
  })
  is_clear: boolean;

  @Column({
    type: 'int',
    comment: '플레이 시간',
  })
  play_time: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    comment: '생성일',
  })
  created_at!: Date;
}
