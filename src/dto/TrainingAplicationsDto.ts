import { TrainingAplications } from '../orm/entities/TrainingAplications';

export class TrainingAplicationsDto {
id: number;
lockedTime: string;
typeTraining: string;
horseId: number;
clientId: number;
state: string;
trainingTime: string;
trainerPassport: number;

constructor(app: TrainingAplications) {
this.id = app.id;
this.lockedTime = app.locedtime;
this.typeTraining = app.typetraining;
this.horseId = app.horseid;
this.clientId = app.clientid;
this.state = app.state;
this.trainingTime = app.trainingtime;
this.trainerPassport = app.trenerpasport;
}
}