import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { TrainingAplications } from '../orm/entities/TrainingAplications';
import { Horses } from '../orm/entities/Horses';
import { ClientAckount } from '../orm/entities/ClientAckount';
import { Treners } from '../orm/entities/Treners';

const trAppRepo = () => getRepository(TrainingAplications);
const horsesRepo = () => getRepository(Horses);
const clientRepo = () => getRepository(ClientAckount);
const trenerRepo = () => getRepository(Treners);

// Create application
export const createTrainingAplication = async (req: Request, res: Response) => {
  try {
    const {
      locedtime,
      typetraining,
      horseid,
      clientid,
      state,
      trainingtime,
      trenerpasport,
    } = req.body;

    // validate relations if provided
    const horse = horseid ? await horsesRepo().findOne(horseid) : null;
    if (horseid && !horse) return res.status(404).json({ message: 'Кінь не знайдено' });

    const client = clientid ? await clientRepo().findOne(clientid) : null;
    if (clientid && !client) return res.status(404).json({ message: 'Клієнт не знайдено' });

    const trener = trenerpasport ? await trenerRepo().findOne(trenerpasport) : null;
    if (trenerpasport && !trener) return res.status(404).json({ message: 'Тренер не знайдено' });

    const newApp = trAppRepo().create({
      locedtime,
      typetraining,
      horseid,
      clientid,
      state,
      trainingtime,
      trenerpasport,
      Horses: horse || undefined,
      ClientAckount: client || undefined,
      Treners: trener || undefined,
    });

    const saved = await trAppRepo().save(newApp);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні заявки', error });
  }
};

// Get all with relations
export const getTrainingAplications = async (_req: Request, res: Response) => {
  const list = await trAppRepo().find({ relations: ['Horses', 'ClientAckount', 'Treners'] });
  return res.json(list);
};

// Get by id
export const getTrainingAplicationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await trAppRepo().findOne(id, { relations: ['Horses', 'ClientAckount', 'Treners'] });
  if (!item) return res.status(404).json({ message: 'Заявку не знайдено' });
  return res.json(item);
};

// Update
export const updateTrainingAplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await trAppRepo().findOne(id);
  if (!item) return res.status(404).json({ message: 'Заявку не знайдено' });

  const {
    locedtime,
    typetraining,
    horseid,
    clientid,
    state,
    trainingtime,
    trenerpasport,
  } = req.body;

  if (horseid !== undefined) {
    const horse = await horsesRepo().findOne(horseid);
    if (!horse) return res.status(404).json({ message: 'Кінь не знайдено' });
    item.Horses = horse;
    item.horseid = horseid;
  }
  if (clientid !== undefined) {
    const client = await clientRepo().findOne(clientid);
    if (!client) return res.status(404).json({ message: 'Клієнт не знайдено' });
    item.ClientAckount = client;
    item.clientid = clientid;
  }
  if (trenerpasport !== undefined) {
    const trener = await trenerRepo().findOne(trenerpasport);
    if (!trener) return res.status(404).json({ message: 'Тренер не знайдено' });
    item.Treners = trener;
    item.trenerpasport = trenerpasport;
  }

  item.locedtime = locedtime ?? item.locedtime;
  item.typetraining = typetraining ?? item.typetraining;
  item.state = state ?? item.state;
  item.trainingtime = trainingtime ?? item.trainingtime;

  const updated = await trAppRepo().save(item);
  return res.json(updated);
};

// Delete
export const deleteTrainingAplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await trAppRepo().findOne(id);
  if (!item) return res.status(404).json({ message: 'Заявку не знайдено' });

  await trAppRepo().remove(item);
  return res.json({ message: 'Заявку успішно видалено' });
};