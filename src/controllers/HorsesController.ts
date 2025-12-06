import { Request, Response, NextFunction } from 'express';
import { HorsesService } from '../services/HorsesService';

export class HorsesController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const horsesService = new HorsesService();
      const result = await horsesService.getAllHorses();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const horsesService = new HorsesService();
      const result = await horsesService.getHorseById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const horsesService = new HorsesService();
      const result = await horsesService.createHorse(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const horsesService = new HorsesService();
      const result = await horsesService.updateHorse(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const horsesService = new HorsesService();
      const result = await horsesService.deleteHorse(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}