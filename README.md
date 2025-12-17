# Лабораторно-практична робота №5

## Розширення бекенд-додатку власними сутностями та реалізація REST API

## Діаграмма сутностей:

![Діаграма](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-04%20151836.png)

## Короткий опис реалізованих сутностей:
### Horses - сутність що описує всіх коней.
### TradeReports - сутність описує всі відомості про торгівлю тваринами.
### TrainingAplications - сутність описує всі заявки на тренування верховій їзді, їх статусі та назначених коней і тренерів.

## Основні контролери:

### 1. **Horses**

**Функції:**

* `GET /Horses` — перегляд списку коней
* `GET /Horses/:id` — знаходження конкретного коня
* `POST /Horses` — додати коня
* `PUT /Horses/:id` — редагувати коня
* `DELETE /Horses/:id` — видалити коня

---

### 2. **TradeReports**

**Функції:**

* `GET /TradeReports` — перегляд усіх відомостей про торгівлю тваринами
* `GET /TradeReports/:id` — перегляд конкретної відомості
* `POST /TradeReports` — оформлення нової відомості
* `PUT /TradeReports/:id` — редагування відомості
* `DELETE /TradeReports/:id` — видалення відомості

---

### 3. **TrainingAplications**

**Функції:**

* `GET /TrainingAplications` — перегляд усіх заявок на тренування
* `GET /TrainingAplications/:id` — перегляд конкретної заявки
* `POST /TrainingAplications` — оформлення нової заявки
* `PUT /TrainingAplications/:id` — редагування заявки
* `DELETE /TrainingAplications/:id` — видалення заявки

---

## Postman

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20103709.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20103846.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20103940.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20105935.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20110058.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20112248.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20112411.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20112427.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20112557.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20112610.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20113250.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20113316.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20113329.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20113437.png)

![photo](https://github.com/AndriiDrahniew/LB5/blob/main/Screenshots/Screenshot%202025-12-07%20113451.png)

# Лабораторно-практична робота №6

## Шари додатку

### Middleware
Middleware-функції перевіряють коректність даних до передачі їх у бізнес-логіку.
У разі помилки — створюється об’єкт CustomError із статусом 400 Bad Request.

### Controller
Контролери відповідають за: прийом запиту від клієнта, виклик відповідного сервісу, формування та повернення відповіді або помилки. Контролер не містить бізнес-логіки — лише координує запит.

### Service
Сервіси реалізують бізнес-правила додатку. Вони працюють з даними, виконують перевірки, звертаються до репозиторіїв і повертають результат у вигляді DTO.

## Приклади коду
### Middleware
```
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
```
### Controller
```
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
```
### Services
```
import { getRepository } from 'typeorm';
import { Horses } from '../orm/entities/Horses';
import { HorsesDto } from '../dto/HorsesDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class HorsesService {
  private horsesRepository = getRepository(Horses);

  async getAllHorses() {
    const horses = await this.horsesRepository.find({
      relations: ['TradeReports', 'TrainingAplications', 'Still'],
    });
    return horses.map((h) => new HorsesDto(h));
  }

  async getHorseById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID коня');
    }

    const horse = await this.horsesRepository.findOne({
      where: { id },
      relations: ['TradeReports', 'TrainingAplications', 'Still'],
    });

    if (!horse) {
      throw new CustomError(404, 'General', 'Коня не знайдено');
    }

    return new HorsesDto(horse);
  }

  async createHorse(data: Partial<Horses>) {
    const entity = this.horsesRepository.create(data);
    const created = await this.horsesRepository.save(entity);
    return new HorsesDto(created);
  }

  async updateHorse(id: number, data: Partial<Horses>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID коня');
    }

    const horse = await this.horsesRepository.findOne({ where: { id } });
    if (!horse) {
      throw new CustomError(404, 'General', 'Коня не знайдено');
    }

    Object.assign(horse, data);
    const updated = await this.horsesRepository.save(horse);
    return new HorsesDto(updated);
  }

  async deleteHorse(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID коня');
    }

    const result = await this.horsesRepository.delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'Коня не знайдено');
    }

    return { message: `Кінь з ID ${id} успішно видалений` };
  }
}
```
