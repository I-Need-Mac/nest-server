import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @OneToMany(() => Users, (users) => users.stream_id)
  stream_id!: Users[];

  @Column({
    type: 'varchar',
    comment: '닉네임',
  })
  name!: string;

  @Column({
    type: 'int',
    comment: '1: 관리자, 2: 일반 유저',
  })
  admin_level!: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '로그인일',
  })
  login_at!: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '생성일',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '수정일',
  })
  updated_at!: Date;

  @Column({
    type: 'bool',
    comment: 'true: 사용, false: 미사용',
  })
  is_use!: boolean;
}
