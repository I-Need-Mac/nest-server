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

@Entity('souls')
export class Souls extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @ManyToOne(() => Users, (users) => users.stream_id)
  stream_id!: Users;

  @Column({
    comment: '상위 혼 종류',
    type: 'int',
  })
  saint_soul_type!: number;

  @Column({
    comment: '소울1 조각 개수',
    type: 'int',
  })
  soul1!: number;

  @Column({
    comment: '소울2 조각 개수',
    type: 'int',
  })
  soul2!: number;

  @Column({
    comment: '소울3 조각 개수',
    type: 'int',
  })
  soul3!: number;

  @Column({
    comment: '소울4 조각 개수',
    type: 'int',
  })
  soul4!: number;

  @Column({
    comment: '소울5 조각 개수',
    type: 'int',
  })
  soul5!: number;

  @Column({
    comment: '소울6 조각 개수',
    type: 'int',
  })
  soul6!: number;

  @Column({
    comment: '소울7 조각 개수',
    type: 'int',
  })
  soul7!: number;

  @Column({
    comment: '소울8 조각 개수',
    type: 'int',
  })
  soul8!: number;

  @Column({
    comment: '소울9 조각 개수',
    type: 'int',
  })
  soul9!: number;

  @Column({
    comment: '소울10 조각 개수',
    type: 'int',
  })
  soul10!: number;

  @Column({
    comment: '소울11 조각 개수',
    type: 'int',
  })
  soul11!: number;

  @Column({
    comment: '소울12 조각 개수',
    type: 'int',
  })
  soul12!: number;

  @Column({
    comment: '소울13 조각 개수',
    type: 'int',
  })
  soul13!: number;

  @Column({
    comment: '소울14 조각 개수',
    type: 'int',
  })
  soul14!: number;

  @Column({
    comment: '소울15 조각 개수',
    type: 'int',
  })
  soul15!: number;

  @Column({
    comment: '소울16 조각 개수',
    type: 'int',
  })
  soul16!: number;

  @Column({
    comment: '소울17 조각 개수',
    type: 'int',
  })
  soul17!: number;

  @Column({
    comment: '소울18 조각 개수',
    type: 'int',
  })
  soul18!: number;
}
