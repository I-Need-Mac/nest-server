import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('characters')
export class Characters extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @Column({
    type: 'varchar',
    comment: '스팀 아이디',
  })
  steam_id: string;

  @Column({
    type: 'bool',
    comment: 'HoJin 캐릭터 해금 여부',
    default: () => 'true',
  })
  hojin!: boolean;

  @Column({
    type: 'bool',
    comment: 'Seimei 캐릭터 해금 여부',
    default: () => 'false',
  })
  seimei!: boolean;

  @Column({
    type: 'bool',
    comment: 'Macia 캐릭터 해금 여부',
    default: () => 'false',
  })
  macia!: boolean;

  @Column({
    type: 'bool',
    comment: 'Sinwol 캐릭터 해금 여부',
    default: () => 'false',
  })
  sinwol!: boolean;

  @Column({
    type: 'bool',
    comment: 'Siwoo 캐릭터 해금 여부',
    default: () => 'false',
  })
  siwoo!: boolean;

  @Column({
    type: 'bool',
    comment: 'Ulises 캐릭터 해금 여부',
    default: () => 'false',
  })
  ulises!: boolean;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'steam_id', referencedColumnName: 'steam_id' })
  users: Users;
}
