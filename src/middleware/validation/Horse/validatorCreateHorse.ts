import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateHorse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      weight,
      stallNumber,
      using,
      owner,
      age,
      height,
      breed,
      name,
      sex,
      health
    } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];

    if (!weight || !validator.isInt(String(weight))) {
      errorsValidation.push({ weight: "Поле 'Вага' повинно бути цілим числом" });
    }

    if (!stallNumber || !validator.isInt(String(stallNumber))) {
      errorsValidation.push({ stallNumber: "Поле 'Номер стійла' повинно бути цілим числом" });
    }

    if (!using || validator.isEmpty(using.trim())) {
      errorsValidation.push({ using: "Поле 'Використання' є обов’язковим" });
    }

    if (!owner || validator.isEmpty(owner.trim())) {
      errorsValidation.push({ owner: "Поле 'Власник' є обов’язковим" });
    }

    if (!age || !validator.isInt(String(age))) {
      errorsValidation.push({ age: "Поле 'Вік' повинно бути цілим числом" });
    }

    if (!height || !validator.isInt(String(height))) {
      errorsValidation.push({ height: "Поле 'Зріст' повинно бути цілим числом" });
    }

    if (!breed || validator.isEmpty(breed.trim())) {
      errorsValidation.push({ breed: "Поле 'Порода' є обов’язковим" });
    }

    if (!name || validator.isEmpty(name.trim())) {
      errorsValidation.push({ name: "Поле \"Ім'я\" є обов’язковим" });
    }

    if (!sex || validator.isEmpty(sex.trim())) {
      errorsValidation.push({ sex: "Поле 'Стать' є обов’язковим" });
    } else if (!['M', 'F'].includes(sex)) {
      errorsValidation.push({ sex: "Поле 'Стать' повинно бути 'M' або 'F'" });
    }

    if (health && !validator.isLength(health, { max: 1000 })) {
      errorsValidation.push({ health: "Поле \"Стан здоров'я\" не повинно перевищувати 1000 символів" });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400, 'Validation', 'Помилка валідації коня', null, null, errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};