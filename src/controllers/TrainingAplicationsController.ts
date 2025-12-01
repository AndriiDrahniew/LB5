import { Request, Response, NextFunction } from 'express';

import { TrainingAplicationsService } from '../services/TrainingAplicationsService';

const trainingAplicationsService = new TrainingAplicationsService();

export class TrainingAplicationsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await trainingAplicationsService.getAllTrainingAplications();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await trainingAplicationsService.getTrainingAplicationById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await trainingAplicationsService.createTrainingAplication(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await trainingAplicationsService.updateTrainingAplication(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await trainingAplicationsService.deleteTrainingAplication(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}