import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('medicines')
export class MedicinesEntity {
  @PrimaryColumn({ type: String })
  id: string;

  @Column({ nullable: true })
  morning: string | undefined | null;

  @Column({ nullable: true })
  evening: string | undefined | null;

  @Column({ nullable: true })
  afternoon: string | undefined | null;

  @Column({ nullable: true })
  description: string | null;

  @Column({ length: 40 })
  type: string;

  @Column({ default: 'medicine1.png' })
  thumbnail: string;

  @Column({ default: 0 })
  repeat: number;
}
