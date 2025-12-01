//ClientAckount
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import { TrainingAplications } from './TrainingAplications';

@Entity({ name: 'Аккаунт користувача' })
export class ClientAckount {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'int' })
  id: number;

  @Column({ name: 'Логін', type: 'int', unique: true })
  login: number;

  @Column({ type: 'int', name: 'Вага користувача' })
  weightClient: number;

  @Column({ type: 'varchar', name: 'Прізвище', length: 50 })
  surname: string;

  @Column({ type: 'varchar', name: "Ім'я", length: 50 })
  name: string;

  @OneToMany(() => TrainingAplications, (a) => a.ClientAckount)
  TrainingAplications: TrainingAplications[];

}
