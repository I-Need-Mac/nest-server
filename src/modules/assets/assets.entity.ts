import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('assets')
export class Assets extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id!: number;

  @Column({
    type: 'int',
    comment: '스팀 아이디',
  })
  stream_id: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '상자를 열 수 있는 재화',
  })
  play_key!: boolean;

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

  @ManyToOne(() => Users, (users) => users.stream_ids)
  @JoinColumn({ name: 'stream_id' })
  users: Users;
}
