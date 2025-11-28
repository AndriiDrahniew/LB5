//Grooms
import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { Still } from './Still';
import { Positions } from './Positions';

@Entity({ name: 'Конюхи' })
export class Grooms {
  @PrimaryColumn({ name: 'Id', type: 'int' })
  id: number;

  @Column({ type: 'smallint', name: 'Номер стійла' })
  numberStill: number;

  @OneToOne(() => Positions, (p) => p.Grooms, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'Id' })
  Positions: Positions;

  @ManyToOne(() => Still, (h) => h.Grooms, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'Номер стійла' })
  Still: Still;
}
