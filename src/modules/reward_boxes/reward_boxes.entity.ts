import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('reward_boxes')
export class Reward_boxes extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @ManyToOne(() => Users, (users) => users.stream_id)
  stream_id!: Users;

  @Column({
    type: 'int',
    comment: '상자 등급',
  })
  box_type!: number;

  @Column({
    type: 'int',
    comment: '획득한 스테이지',
  })
  stage_id!: number;

  @Column({
    type: 'datetime',
    comment: '오픈 시간',
  })
  open_start_time!: Date;

  @Column({
    type: 'bool',
    comment: '보상 받았는지 여부',
  })
  is_open!: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성일',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '수정일',
  })
  updated_at!: Date;
}
