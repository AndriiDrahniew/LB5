//Horses
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';

import { TradeReports } from './TradeReports';
import { TrainingAplications } from './TrainingAplications';
import { Still } from './Still';

@Entity({ name: 'Коні' })
export class Horses {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'int' })
  id: number;

  @Column({ type: 'int', name: 'Вага' })
  weight: number;

  @Column({ type: 'smallint', name: 'Номер стійла' })
  stallNumber: number;

  @Column({ type: 'varchar', name: 'Використання' })
  using: string;

  @Column({ type: 'varchar', name: 'Власник', length: 100 })
  owner: string;

  @Column({ type: 'smallint', name: 'Вік' })
  age: number;

  @Column({ type: 'int', name: 'Зріст' })
  height: number;

  @Column({ type: 'varchar', name: 'Порода', length: 50 })
  breed: string;

  @Column({ type: 'varchar', name: "Ім'я", length: 50 })
  name: string;

  @Column({ type: 'varchar', name: 'Стать', length: 1 })
  sex: string;

  @Column({ type: 'varchar', name: "Стан здоров'я", nullable: true, length: 1000 })
  health?: string;

  @OneToMany(() => TradeReports, (t) => t.Horses)
  TradeReports: TradeReports[];

  @OneToMany(() => TrainingAplications, (a) => a.Horses)
  TrainingAplications: TrainingAplications[];

  @ManyToOne(() => Still, (s) => s.Horses, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'Номер стійла' })
  Still: Still;
}
