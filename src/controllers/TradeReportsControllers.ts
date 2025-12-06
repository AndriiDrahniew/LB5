import { Request, Response, NextFunction } from 'express';

import { TradeReportsService } from '../services/TradeReportsService';

//const tradeReportsService = new TradeReportsService();

export class TradeReportsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tradeReportsService = new TradeReportsService();
      const result = await tradeReportsService.getAllTradeReports();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const tradeReportsService = new TradeReportsService();
      const result = await tradeReportsService.getTradeReportById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const tradeReportsService = new TradeReportsService();
      const result = await tradeReportsService.createTradeReport(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const tradeReportsService = new TradeReportsService();
      const result = await tradeReportsService.updateTradeReport(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const tradeReportsService = new TradeReportsService();
      const result = await tradeReportsService.deleteTradeReport(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}