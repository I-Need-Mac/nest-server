import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Users } from '@users/users.entity';

@Entity('presets')
export class Presets extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @Column({
    type: 'varchar',
    comment: '스팀 아이디',
  })
  steam_id!: string;

  @Column({
    comment: '상위 혼 종류',
    type: 'int',
    nullable: true,
    default: () => 'NULL',
  })
  saint_soul_type: number | null;

  @Column({
    comment: '하위 soul1 종류',
    type: 'int',
    nullable: true,
    default: () => 'NULL',
  })
  soul1: number | null;

  @Column({
    comment: '하위 soul2 종류',
    type: 'int',
    nullable: true,
    default: () => 'NULL',
  })
  soul2: number | null;

  @Column({
    comment: '하위 soul3 종류',
    type: 'int',
    nullable: true,
    default: () => 'NULL',
  })
  soul3: number | null;

  @Column({
    comment: '하위 soul4 종류',
    type: 'int',
    nullable: true,
    default: () => 'NULL',
  })
  soul4: number | null;

  @Column({
    comment: '하위 soul5 종류',
    type: 'int',
    nullable: true,
    default: () => 'NULL',
  })
  soul5: number | null;

  @Column({
    comment: '하위 soul6 종류',
    type: 'int',
    nullable: true,
    default: () => 'NULL',
  })
  soul6: number | null;

  @Column({
    comment: '캐릭터 이름',
    type: 'varchar',
    nullable: true,
    default: 'hojin',
  })
  character: string | null;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'steam_id', referencedColumnName: 'steam_id' })
  users: Users;
}
