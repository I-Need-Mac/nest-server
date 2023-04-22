import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('presets')
export class Presets extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @Column({
    type: 'int',
    comment: '스팀 아이디',
  })
  steam_id: number;

  @Column({
    comment: '상위 혼 종류',
    type: 'int',
  })
  saint_soul_type!: number;

  @Column({
    comment: '하위 soul1 종류',
    type: 'int',
  })
  soul1!: number;

  @Column({
    comment: '하위 soul2 종류',
    type: 'int',
  })
  soul2!: number;

  @Column({
    comment: '하위 soul3 종류',
    type: 'int',
  })
  soul3!: number;
  @Column({
    comment: '하위 soul4 종류',
    type: 'int',
  })
  soul4!: number;

  @Column({
    comment: '하위 soul5 종류',
    type: 'int',
  })
  soul5!: number;

  @Column({
    comment: '하위 soul6 종류',
    type: 'int',
  })
  soul6!: number;

  @Column({
    comment: '캐릭터 이름',
    type: 'varchar',
  })
  character!: string;

  @ManyToOne(() => Users, (users) => users.steam_ids)
  @JoinColumn({ name: 'steam_id' })
  users: Users;
}
