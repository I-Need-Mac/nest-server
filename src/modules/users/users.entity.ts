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
  @PrimaryGeneratedColumn({ type: 'int', comment: '고유 ID' })
  id: number;

  @Column({ type: 'varchar', comment: '스팀아이디', unique: true })
  steam_id!: string;

  @Column({
    type: 'varchar',
    comment: '닉네임',
  })
  name!: string;

  @Column({
    type: 'int',
    default: () => '2',
    comment: '1: 관리자, 2: 일반 유저',
  })
  admin_level!: number;

  @Column({
    type: 'datetime',
    nullable: true,
    default: () => 'NULL',
    comment: '로그인일',
  })
  login_at: Date | null;

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

  @Column({
    type: 'bool',
    default: () => 'true',
    comment: 'true: 사용, false: 미사용',
  })
  is_use!: boolean;

  @OneToMany(() => Users, (users) => users.steam_id)
  childSteam_id!: Users[];
}
