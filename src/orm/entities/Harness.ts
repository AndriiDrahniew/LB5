//Harness
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Still } from './Still';
//import { LivingReceipt } from './LivingReceipt';
//import { Payment } from './Payment';
//import { RepairRequest } from './RepairRequest';
//import { StudentRoomHistory } from './StudentRoomHistory';

@Entity({ name: 'Збруя' })
export class Harness {
  @PrimaryGeneratedColumn({ name: 'ID_Збруї', type: 'int' })
  id: number;

  @Column({ type: 'varchar', name: 'Тип', length: 20 })
  type: string;

  @Column({ type: 'smallint', name: 'Номер стійла' })
  stallNumber: number;

  @Column({ type: 'varchar', name: 'Назва', length: 50 })
  name: string;

  @Column({ type: 'varchar', name: 'Примітка', length: 250 })
  text: string;

  @ManyToOne(() => Still, (h) => h.Harness, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'Номер стійла' })
  Still: Still;

}
