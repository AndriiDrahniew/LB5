import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Horses } from '../orm/entities/Horses';
import { Still } from '../orm/entities/Still';

const horsesRepo = () => getRepository(Horses);
const stillRepo = () => getRepository(Still);

// Create horse
export const createHorse = async (req: Request, res: Response) => {
  try {
    const {
      weight,
      stallNumber,
      using: usingField,
      owner,
      age,
      height,
      breed,
      name,
      sex,
      health,
    } = req.body;

    // Проверяем, что такое стійло существует
    const still = await stillRepo().findOne({ where: { stallNumber } });
    if (!still) {
      return res.status(404).json({ message: 'Стійло з таким номером не знайдено' });
    }

    const newHorse = horsesRepo().create({
      weight,
      stallNumber,
      using: usingField,
      owner,
      age,
      height,
      breed,
      name,
      sex,
      health,
      Still: still, // связь по FK через 'Номер стійла'
    });

    const saved = await horsesRepo().save(newHorse);
    return res.status(201).json(saved);

  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні коня', error });
  }
};

// Get all horses (with relations)
export const getHorses = async (_req: Request, res: Response) => {
  const list = await horsesRepo().find({
    relations: ['TradeReports', 'TrainingAplications', 'Still'],
  });
  return res.json(list);
};

// Get horse by id
export const getHorseById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const horse = await horsesRepo().findOne(id, {
    relations: ['TradeReports', 'TrainingAplications', 'Still'],
  });

  if (!horse) return res.status(404).json({ message: 'Кінь не знайдено' });
  return res.json(horse);
};

// Update horse
export const updateHorse = async (req: Request, res: Response) => {
  const { id } = req.params;

  const horse = await horsesRepo().findOne(id);
  if (!horse) return res.status(404).json({ message: 'Кінь не знайдено' });

  const {
    stallNumber,
    ...rest
  } = req.body;

  // Если отправлен новый номер стійла — проверяем
  if (stallNumber !== undefined) {
    const still = await stillRepo().findOne({ where: { stallNumber } });
    if (!still) {
      return res.status(404).json({ message: 'Стійло з таким номером не існує' });
    }
    horse.stallNumber = stallNumber;
    horse.Still = still;
  }

  Object.assign(horse, rest);

  const updated = await horsesRepo().save(horse);
  return res.json(updated);
};

// Delete horse
export const deleteHorse = async (req: Request, res: Response) => {
  const { id } = req.params;

  const horse = await horsesRepo().findOne(id);
  if (!horse) return res.status(404).json({ message: 'Кінь не знайдено' });

  await horsesRepo().remove(horse);
  return res.json({ message: 'Кінь успішно видалено' });
};