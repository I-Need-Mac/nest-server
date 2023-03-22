import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';

@Entity('character')
export class SainSoul extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '고유 ID' })
  id: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '스팀 아이디',
  })
  stream_id!: number;

  @Column({
    type: 'bool',
    comment: 'HoJin 캐릭터 해금 여부',
  })
  hojin: boolean;

  @Column({
    type: 'bool',
    comment: 'Seimei 캐릭터 해금 여부',
  })
  seimei: boolean;

  @Column({
    type: 'bool',
    comment: 'Macia 캐릭터 해금 여부',
  })
  macia: boolean;

  @Column({
    type: 'bool',
    comment: 'Sinwol 캐릭터 해금 여부',
  })
  sinwol: boolean;

  @Column({
    type: 'bool',
    comment: 'SiWoo 캐릭터 해금 여부',
  })
  siWoo: boolean;

  @Column({
    type: 'bool',
    comment: 'Ulises 캐릭터 해금 여부',
  })
  ulises: boolean;
}
