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