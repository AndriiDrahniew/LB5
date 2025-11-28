//Treners
import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { TrainingAplications } from './TrainingAplications';
import { Positions } from './Positions';

@Entity({ name: 'Тренери' })
export class Treners {
  @PrimaryColumn({ name: 'Id', type: 'int' })
  id: number;

  @Column({ type: 'smallint', name: 'Стаж' })
  yearswork: number;

  @OneToOne(() => Positions, (p) => p.Treners, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'Id' })
  Positions: Positions;

  @OneToMany(() => TrainingAplications, (t) => t.Treners)
  TrainingAplications: TrainingAplications[];
}
