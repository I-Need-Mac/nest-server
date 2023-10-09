import { PrimaryGeneratedColumn, BaseEntity, Entity, CreateDateColumn, Column } from 'typeorm';

@Entity('reward_histories')
export class RewardHistories extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성일',
  })
  created_at!: Date;

  @Column({
    type: 'varchar',
    comment: 'user steam id',
  })
  steam_id!: string;

  @Column({
    type: 'int',
    comment: 'reward_boxes 테이블의 id',
  })
  reward_box_id!: number;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '보상 1',
  })
  reward1: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '보상 2',
  })
  reward2: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '보상 3',
  })
  reward3: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: '보상 4',
  })
  reward4: string | null;
}
