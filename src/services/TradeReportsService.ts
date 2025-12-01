import { getRepository } from 'typeorm';
import { TradeReports } from '../orm/entities/TradeReports';
import { TradeReportsDto } from '../dto/TradeReportsDto';
import { CustomError } from '../utils/response/custom-error/CustomError';

export class TradeReportsService {
  private repo = getRepository(TradeReports);

  async getAllTradeReports() {
    const items = await this.repo.find({ relations: ['Horses'] });
    return items.map((i) => new TradeReportsDto(i));
  }

  async getTradeReportById(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID звіту');
    }

    const item = await this.repo.findOne({
      where: { id },
      relations: ['Horses'],
    });

    if (!item) {
      throw new CustomError(404, 'General', 'Звіт не знайдено');
    }

    return new TradeReportsDto(item);
  }

  async createTradeReport(data: Partial<TradeReports>) {
    const entity = this.repo.create(data);
    const created = await this.repo.save(entity);
    return new TradeReportsDto(created);
  }

  async updateTradeReport(id: number, data: Partial<TradeReports>) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID звіту');
    }

    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new CustomError(404, 'General', 'Звіт не знайдено');
    }

    Object.assign(item, data);
    const updated = await this.repo.save(item);
    return new TradeReportsDto(updated);
  }

  async deleteTradeReport(id: number) {
    if (isNaN(id)) {
      throw new CustomError(400, 'Validation', 'Некоректний ID звіту');
    }

    const result = await this.repo.delete(id);
    if (!result.affected) {
      throw new CustomError(404, 'General', 'Звіт не знайдено');
    }

    return { message: `Звіт з ID ${id} успішно видалено` };
  }
}