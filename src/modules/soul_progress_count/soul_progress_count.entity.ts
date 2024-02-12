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
    comment: '소울1 진척도',
    default: () => '0',
    type: 'int',
  })
  soul1_count!: number;

  @Column({
    comment: '소울2 진척도',
    type: 'int',
    default: () => '0',
  })
  soul2_count!: number;

  @Column({
    comment: '소울3 진척도',
    type: 'int',
    default: () => '0',
  })
  soul3_count!: number;

  @Column({
    comment: '소울4 진척도',
    type: 'int',
    default: () => '0',
  })
  soul4_count!: number;

  @Column({
    comment: '소울5 진척도',
    type: 'int',
    default: () => '0',
  })
  soul5_count!: number;

  @Column({
    comment: '소울6 진척도',
    type: 'int',
    default: () => '0',
  })
  soul6_count!: number;

  @Column({
    comment: '소울7 진척도',
    type: 'int',
    default: () => 0,
  })
  soul7_count!: number;

  @Column({
    comment: '소울8 진척도',
    type: 'int',
    default: () => '0',
  })
  soul8_count!: number;

  @Column({
    comment: '소울9 진척도',
    type: 'int',
    default: () => '0',
  })
  soul9_count!: number;

  @Column({
    comment: '소울10 진척도',
    type: 'int',
    default: () => '0',
  })
  soul10_count!: number;

  @Column({
    comment: '소울11 진척도',
    type: 'int',
    default: () => '0',
  })
  soul11_count!: number;

  @Column({
    comment: '소울12 진척도',
    type: 'int',
    default: () => '0',
  })
  soul12_count!: number;

  @Column({
    comment: '소울13 진척도',
    type: 'int',
    default: () => '0',
  })
  soul13_count!: number;

  @Column({
    comment: '소울14 진척도',
    type: 'int',
    default: () => '0',
  })
  soul14_count!: number;

  @Column({
    comment: '소울15 진척도',
    type: 'int',
    default: () => '0',
  })
  soul15_count!: number;

  @Column({
    comment: '소울16 진척도',
    type: 'int',
    default: () => '0',
  })
  soul16_count!: number;

  @Column({
    comment: '소울17 진척도',
    type: 'int',
    default: () => '0',
  })
  soul17_count!: number;

  @Column({
    comment: '소울18 진척도',
    type: 'int',
    default: () => '0',
  })
  soul18_count!: number;

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
