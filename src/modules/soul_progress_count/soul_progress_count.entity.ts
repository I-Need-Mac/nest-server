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
  
  @Entity('soul_progress_count')
  export class SoulProgressCount extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', comment: '고유 ID' })
  id: number;
  
  @Column({
  type: 'varchar',
  comment: '스팀 아이디',
  })
  steam_id: string;
  
  @Column({
  comment: '하위 혼 ID',
  type: 'int',
  nullable: false,
  })
  souls_id!: number;
  
  @Column({
  comment: '하위 혼 명',
  type: 'varchar',
  })
  soul_name: string;
  
  @Column({
  type: 'int',
  comment: '현재 카운트',
  precision: 10,
  default: 0,
  })
  now_count!: number;
  
  @Column({
  type: 'int',
  comment: '최대 카운트',
  precision: 10,
  default: 0,
  })
  max_count!: number;
  
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
  
  @ManyToOne(() => Users)
  @JoinColumn({ name: 'steam_id', referencedColumnName: 'steam_id' })
  users: Users;
  }