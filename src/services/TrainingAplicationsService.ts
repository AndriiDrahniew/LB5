import { getRepository } from 'typeorm';
import { TrainingAplications } from '../orm/entities/TrainingAplications';
import { TrainingAplicationsDto } from '../dto/TrainingAplicationsDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class TrainingAplicationsService {
  private repo = getRepository(TrainingAplications);

  async getAllTrainingAplications() {
    const items = await this.repo.find({
      relations: ['Horses', 'ClientAckount', 'Treners'],
    });
    return items.map((i) => new TrainingAplicationsDto(i));
  }

  async getTrainingAplicationById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID заявки');
    }

    const item = await this.repo.findOne({
      where: { id },
      relations: ['Horses', 'ClientAckount', 'Treners'],
    });

    if (!item) {
      throw new CustomError(404, 'General', 'Заявку не знайдено');
    }

    return new TrainingAplicationsDto(item);
  }

  async createTrainingAplication(data: Partial<TrainingAplications>) {
    const entity = this.repo.create(data);
    const created = await this.repo.save(entity);
    return new TrainingAplicationsDto(created);
  }

  async updateTrainingAplication(id: number, data: Partial<TrainingAplications>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID заявки');
    }

    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new CustomError(404, 'General', 'Заявку не знайдено');
    }

    Object.assign(item, data);
    const updated = await this.repo.save(item);
    return new TrainingAplicationsDto(updated);
  }

  async deleteTrainingAplication(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID заявки');
    }

    const result = await this.repo.delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'Заявку не знайдено');
    }

    return { message: `Заявку з ID ${id} успішно видалено` };
  }
}