//Still
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { Harness } from './Harness';
import { Horses } from './Horses';
import { Grooms } from './Grooms';
//import { Payment } from './Payment';
//import { RepairRequest } from './RepairRequest';
//import { StudentRoomHistory } from './StudentRoomHistory';

@Entity({ name: 'Стійло' })
export class Still {
  @PrimaryGeneratedColumn({ name: 'Номер стійла', type: 'smallint' })
  id: number;

  @Column({ type: 'smallint', name: 'Кількість місць' })
  countAreas: number;

  @Column({ type: 'varchar', name: 'Примітка', length: 250 })
  text: string;

  //@ManyToOne(() => Still, (h) => h.Harness, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  //Still: Still;

  @OneToMany(() => Harness, (h) => h.Still)
  Harness: Harness[];

  @OneToMany(() => Horses, (o) => o.Still)
  Horses: Horses[];

  @OneToMany(() => Grooms, (g) => g.Still)
  Grooms: Grooms[];
}
