import { TradeReports } from '../orm/entities/TradeReports';

export class TradeReportsDto {
id: number;
actionType: string;
cost: number;
name: string;
surname: string;
horseId: number;

constructor(rep: TradeReports) {
this.id = rep.id;
this.actionType = rep.actiontype;
this.cost = rep.cost;
this.name = rep.name;
this.surname = rep.surname;
this.horseId = rep.horseid;
}
}