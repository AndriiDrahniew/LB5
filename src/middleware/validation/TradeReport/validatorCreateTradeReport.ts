import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateTradeReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { actiontype, cost, name, surname, horseid } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];

    if (!actiontype || validator.isEmpty(actiontype.trim())) {
      errorsValidation.push({ actiontype: "Поле 'Тип транзакції' є обов’язковим" });
    } else if (!validator.isLength(actiontype, { max: 7 })) {
      errorsValidation.push({ actiontype: "Поле 'Тип транзакції' не повинно перевищувати 7 символів" });
    }

    if (cost === undefined || cost === null || !validator.isInt(String(cost))) {
      errorsValidation.push({ cost: "Поле 'Ціна' повинно бути цілим числом" });
    }

    if (!name || validator.isEmpty(name.trim())) {
      errorsValidation.push({ name: "Поле \"Ім'я клієнта\" є обов’язковим" });
    }

    if (!surname || validator.isEmpty(surname.trim())) {
      errorsValidation.push({ surname: "Поле 'Прізвище клієнта' є обов’язковим" });
    }

    if (!horseid || !validator.isInt(String(horseid))) {
      errorsValidation.push({ horseid: "Поле 'Id_Коня' повинно бути цілим числом" });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400, 'Validation', 'Помилка валідації торгової транзакції', null, null, errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};