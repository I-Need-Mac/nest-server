import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
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
    comment: '상위 혼 해금 여부 ID',
    type: 'int',
  })
  saint_soul_type!: number;

  @Column({
    type: 'int',
    comment: 'soul1의 저장된 카운트',
  })
  soul1_count: number;

  @Column({
    type: 'int',
    comment: 'soul1의 최대 카운트',
  })
  soul1_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul2의 저장된 카운트',
  })
  soul2_count: number;

  @Column({
    type: 'int',
    comment: 'soul2의 최대 카운트',
  })
  soul2_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul3의 저장된 카운트',
  })
  soul3_count: number;

  @Column({
    type: 'int',
    comment: 'soul3의 최대 카운트',
  })
  soul3_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul4의 저장된 카운트',
  })
  soul4_count: number;

  @Column({
    type: 'int',
    comment: 'soul4의 최대 카운트',
  })
  soul4_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul5의 저장된 카운트',
  })
  soul5_count: number;

  @Column({
    type: 'int',
    comment: 'soul5의 최대 카운트',
  })
  soul5_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul6의 저장된 카운트',
  })
  soul6_count: number;

  @Column({
    type: 'int',
    comment: 'soul6의 최대 카운트',
  })
  soul6_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul7의 저장된 카운트',
  })
  soul7_count: number;

  @Column({
    type: 'int',
    comment: 'soul7의 최대 카운트',
  })
  soul7_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul8의 저장된 카운트',
  })
  soul8_count: number;

  @Column({
    type: 'int',
    comment: 'soul8의 최대 카운트',
  })
  soul8_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul9의 저장된 카운트',
  })
  soul9_count: number;

  @Column({
    type: 'int',
    comment: 'soul9의 최대 카운트',
  })
  soul9_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul10의 저장된 카운트',
  })
  soul10_count: number;

  @Column({
    type: 'int',
    comment: 'soul10의 최대 카운트',
  })
  soul10_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul11의 저장된 카운트',
  })
  soul11_count: number;

  @Column({
    type: 'int',
    comment: 'soul11의 최대 카운트',
  })
  soul11_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul12의 저장된 카운트',
  })
  soul12_count: number;

  @Column({
    type: 'int',
    comment: 'soul12의 최대 카운트',
  })
  soul12_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul13의 저장된 카운트',
  })
  soul13_count: number;

  @Column({
    type: 'int',
    comment: 'soul13의 최대 카운트',
  })
  soul13_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul14의 저장된 카운트',
  })
  soul14_count: number;

  @Column({
    type: 'int',
    comment: 'soul14의 최대 카운트',
  })
  soul14_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul15의 저장된 카운트',
  })
  soul15_count: number;

  @Column({
    type: 'int',
    comment: 'soul15의 최대 카운트',
  })
  soul15_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul16의 저장된 카운트',
  })
  soul16_count: number;

  @Column({
    type: 'int',
    comment: 'soul16의 최대 카운트',
  })
  soul16_max_count: number;

  @Column({
    type: 'int',
    comment: 'soul17의 저장된 카운트',
  })
  soul17_count: number;

  @Column({
    type: 'int',
    comment: 'soul17의 최대 카운트',
  })
  soul17_max_count: number;

   @Column({
    type: 'int',
    comment: 'soul18의 저장된 카운트',
  })
  soul18_count: number;

  @Column({
    type: 'int',
    comment: 'soul18의 최대 카운트',
  })
  soul18_max_count: number;

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

  @OneToOne(() => Users)
  @JoinColumn({ name: 'steam_id', referencedColumnName: 'steam_id' })
  users: Users;
}
