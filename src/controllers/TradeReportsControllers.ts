import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { TradeReports } from '../orm/entities/TradeReports';
import { Horses } from '../orm/entities/Horses';

const reportsRepo = () => getRepository(TradeReports);
const horsesRepo = () => getRepository(Horses);

// Create report
export const createTradeReport = async (req: Request, res: Response) => {
  try {
    const { actiontype, cost, name, surname, horseid } = req.body;

    const horse = horseid ? await horsesRepo().findOne(horseid) : null;
    if (horseid && !horse) return res.status(404).json({ message: 'Кінь не знайдено' });

    const newReport = reportsRepo().create({
      actiontype,
      cost,
      name,
      surname,
      horseid,
      Horses: horse || undefined,
    });

    const saved = await reportsRepo().save(newReport);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні звіту', error });
  }
};

// Get all (with horse)
export const getTradeReports = async (_req: Request, res: Response) => {
  const list = await reportsRepo().find({ relations: ['Horses'] });
  return res.json(list);
};

// Get by id
export const getTradeReportById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await reportsRepo().findOne(id, { relations: ['Horses'] });
  if (!item) return res.status(404).json({ message: 'Звіт не знайдено' });
  return res.json(item);
};

// Update
export const updateTradeReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await reportsRepo().findOne(id);
  if (!item) return res.status(404).json({ message: 'Звіт не знайдено' });

  const { actiontype, cost, name, surname, horseid } = req.body;

  if (horseid !== undefined) {
    const horse = await horsesRepo().findOne(horseid);
    if (!horse) return res.status(404).json({ message: 'Кінь не знайдено' });
    item.Horses = horse;
    item.horseid = horseid;
  }

  item.actiontype = actiontype ?? item.actiontype;
  item.cost = cost ?? item.cost;
  item.name = name ?? item.name;
  item.surname = surname ?? item.surname;

  const updated = await reportsRepo().save(item);
  return res.json(updated);
};

// Delete
export const deleteTradeReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await reportsRepo().findOne(id);
  if (!item) return res.status(404).json({ message: 'Звіт не знайдено' });

  await reportsRepo().remove(item);
  return res.json({ message: 'Звіт успішно видалено' });
};