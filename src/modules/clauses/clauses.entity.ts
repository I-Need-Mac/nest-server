import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('clauses')
export class Clauses extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @Column({
    type: 'varchar',
    comment: '스팀 아이디',
  })
  steam_id: string;

  @Column({
    comment: '첫 번째 약관',
    type: 'bool',
  })
  first_clause!: boolean;

  @Column({
    comment: '두 번째 약관',
    type: 'bool',
  })
  second_clause!: boolean;

  @Column({
    comment: '세 번째 약관',
    type: 'bool',
  })
  third_clause!: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성일',
  })
  created_at!: Date;

  @ManyToOne((type) => Users)
  @JoinColumn({ name: 'steam_id', referencedColumnName: 'steam_id' })
  users: Users;
}
