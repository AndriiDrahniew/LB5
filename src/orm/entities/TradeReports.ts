//TradeReports
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Horses } from './Horses';

@Entity({ name: 'Відомості про торгівлю тваринами' })
export class TradeReports {
  @PrimaryGeneratedColumn({ name: 'Номер транзакції', type: 'int' })
  id: number;

  //@Column({ type: 'int', name: 'Дата' })
  //date: number;

  @Column({ type: 'varchar', name: 'Тип транзакції', length: 7 })
  actiontype: string;

  @Column({ type: 'int', name: 'Ціна' })
  cost: number;

  @Column({ type: 'varchar', name: "Ім'я клієнта", length: 50 })
  name: string;

  @Column({ type: 'varchar', name: 'Прізвище клієнта', length: 50 })
  surname: string;

  @Column({ name:'Id_Коня', type:'int'})
  horseid: number;

  @ManyToOne(() => Horses, (h) => h.TradeReports, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'Id_Коня' })
  Horses: Horses;

}
