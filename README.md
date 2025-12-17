# Лабораторно-практична робота №5

## Розширення бекенд-додатку власними сутностями та реалізація REST API

## Діаграмма сутностей:

![Діаграмма]()

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

### Controller

### Services
