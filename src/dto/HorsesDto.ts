import { Horses } from '../orm/entities/Horses';

export class HorsesDto {
  id: number;
  weight: number;
  stallNumber: number;
  using: string;
  owner: string;
  age: number;
  height: number;
  breed: string;
  name: string;
  sex: string;
  health: string | null;
  tradeReportIds: number[];
  trainingApplicationIds: number[];

  constructor(horse: Horses) {
    this.id = horse.id;
    this.weight = horse.weight;
    this.stallNumber = horse.stallNumber;
    this.using = horse.using;
    this.owner = horse.owner;
    this.age = horse.age;
    this.height = horse.height;
    this.breed = horse.breed;
    this.name = horse.name;
    this.sex = horse.sex;
    this.health = horse.health ?? null;

    this.tradeReportIds = horse.TradeReports?.map((t) => t.id) ?? [];
    this.trainingApplicationIds = horse.TrainingAplications?.map((a) => a.id) ?? [];
  }
}