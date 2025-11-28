//Horses
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Horses } from './Horses';
import { ClientAckount } from './ClientAckount';
import { Treners } from './Treners';

@Entity({ name: 'Заявки на тренування' })
export class TrainingAplications {
  @PrimaryGeneratedColumn({ name: 'Номер заявки', type: 'int' })
  id: number;

  @Column({ type: 'varchar', name: 'Бажаний час', length: 100 })
  locedtime: string;

  @Column({ type: 'varchar', name: 'Вид тренувань', length: 100 })
  typetraining: string;

  @Column({ type: 'int', name: 'Кінь' })
  horseid: number;

  @Column({ type: 'int', name: 'Id_Клієнта' })
  clientid: string;

  @Column({ type: 'varchar', name: 'Статус' })
  state: string;

  @Column({ type: 'varchar', name: 'Точний час тренування' })
  trainingtime: string;

  @Column({ type: 'int', name: 'Тренер' })
  trenerpasport: number;

  @ManyToOne(() => Horses, (h) => h.TrainingAplications, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'Кінь' })
  Horses: Horses;

  @ManyToOne(() => ClientAckount, (с) => с.TrainingAplications, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'Логін кліента' })
  ClientAckount: ClientAckount;

  @ManyToOne(() => Treners, (t) => t.TrainingAplications, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'Тренер' })
  Treners: Treners;

}
