import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Entity,
  ManyToOne,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('clauses')
export class Clauses extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @ManyToOne(() => Users, (users) => users.stream_id)
  stream_id!: Users;

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
}
