import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('souls')
export class Souls extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @Column({
    type: 'varchar',
    comment: '스팀 아이디',
  })
  steam_id: string;

  @Column({
    comment: '상위 혼 종류',
    type: 'int',
  })
  saint_soul_type!: number;

  @Column({
    comment: '소울1 조각 개수',
    default: () => '0',
    type: 'int',
  })
  soul1!: number;

  @Column({
    comment: '소울2 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul2!: number;

  @Column({
    comment: '소울3 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul3!: number;

  @Column({
    comment: '소울4 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul4!: number;

  @Column({
    comment: '소울5 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul5!: number;

  @Column({
    comment: '소울6 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul6!: number;

  @Column({
    comment: '소울7 조각 개수',
    type: 'int',
    default: () => 0,
  })
  soul7!: number;

  @Column({
    comment: '소울8 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul8!: number;

  @Column({
    comment: '소울9 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul9!: number;

  @Column({
    comment: '소울10 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul10!: number;

  @Column({
    comment: '소울11 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul11!: number;

  @Column({
    comment: '소울12 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul12!: number;

  @Column({
    comment: '소울13 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul13!: number;

  @Column({
    comment: '소울14 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul14!: number;

  @Column({
    comment: '소울15 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul15!: number;

  @Column({
    comment: '소울16 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul16!: number;

  @Column({
    comment: '소울17 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul17!: number;

  @Column({
    comment: '소울18 조각 개수',
    type: 'int',
    default: () => '0',
  })
  soul18!: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'steam_id', referencedColumnName: 'steam_id' })
  users: Users;
}
