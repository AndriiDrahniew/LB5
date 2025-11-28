//Positions
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { Treners } from './Treners';
import { Grooms } from './Grooms';

@Entity({ name: 'Посади' })
export class Positions {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'int' })
  id: number;

  @Column({ name: 'Номер паспорту', type: 'varchar', unique: true })
  passport: string;

  @Column({ type: 'varchar', name: "Ім'я", length: 50 })
  name: string;

  @Column({ type: 'varchar', name: 'Прізвище', length: 50 })
  surname: string;

  @Column({ type: 'varchar', name: 'Посада', length: 50 })
  position: string;

  @OneToOne(() => Treners, (t) => t.Positions)
  Treners: Treners;
  
  @OneToOne(() => Grooms, (g) => g.Positions)
  Grooms: Grooms;
}