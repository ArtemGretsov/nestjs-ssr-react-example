import { Injectable } from '@nestjs/common';
import config from 'config';
import { TemperatureRepository } from '../../database/repositories/temperature.repository';
import { SseService } from '../sse/sse.service';
import { SseNameEnum } from '../../enums/sse-name.enum';
import { TemperatureEntity } from '../../database/entities/temperature.entity';

const COUNT_LAST_ITEMS: number = config.get('temperatures.count_last_items');

@Injectable()
export class TemperatureService {

  constructor(
    private readonly temperatureRepository: TemperatureRepository,
    private readonly sseService: SseService,
  ) { }

  public async save({ computerCode, value }: Pick<TemperatureEntity, 'value'> & { computerCode: string }): Promise<void> {
    const temperature = await this.temperatureRepository.createAndSave({
      value,
      computerCode,
    });
    this.sseService.send(SseNameEnum.temperatures, temperature);
  }

  public async getLast(computerCode: string): Promise<TemperatureEntity[]> {
    return this.temperatureRepository.getLastComputerTemperatures(
      computerCode,
      COUNT_LAST_ITEMS,
    )
  }
}
