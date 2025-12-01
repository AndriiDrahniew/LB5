import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateTrainingApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      locedtime,
      typetraining,
      horseid,
      clientid,
      state,
      trainingtime,
      trenerpasport
    } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];

    if (!locedtime || validator.isEmpty(locedtime.trim())) {
      errorsValidation.push({ locedtime: "Поле 'Бажаний час' є обов’язковим" });
    }

    if (!typetraining || validator.isEmpty(typetraining.trim())) {
      errorsValidation.push({ typetraining: "Поле 'Вид тренувань' є обов’язковим" });
    }

    if (!horseid || !validator.isInt(String(horseid))) {
      errorsValidation.push({ horseid: "Поле 'Кінь' повинно бути цілим числом" });
    }

    if (!clientid || !validator.isInt(String(clientid))) {
      errorsValidation.push({ clientid: "Поле 'Id_Клієнта' повинно бути цілим числом" });
    }

    if (!state || validator.isEmpty(state.trim())) {
      errorsValidation.push({ state: "Поле 'Статус' є обов’язковим" });
    }

    if (!trainingtime || validator.isEmpty(trainingtime.trim())) {
      errorsValidation.push({ trainingtime: "Поле 'Точний час тренування' є обов’язковим" });
    }

    if (!trenerpasport || !validator.isInt(String(trenerpasport))) {
      errorsValidation.push({ trenerpasport: "Поле 'Тренер' повинно бути цілим числом" });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400, 'Validation', 'Помилка валідації заявки на тренування', null, null, errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};