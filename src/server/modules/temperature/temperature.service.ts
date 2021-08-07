import { Injectable } from '@nestjs/common';
import config from 'config';
import { TemperatureRepository } from '../../repositories/Temperature';
import { TemperatureAddingRequestDto } from './dto/temperatureAdding.dto';
import { SseService } from '../sse/sse.service';
import { SseNameEnum } from '../../../enums/sse-name.enum';

const COUNT_LAST_ITEMS: number = config.get('temperatures.count_last_items');

@Injectable()
export class TemperatureService {

  constructor(
    private readonly temperatureRepository: TemperatureRepository,
    private readonly sseService: SseService,
  ) { }

  public async save({ computerCode, value }: TemperatureAddingRequestDto): Promise<void> {
    await this.temperatureRepository.createAndSave({
      value,
      computerCode,
    });
    this.sseService.send(SseNameEnum.temperatures, value);
  }

  public async getLast(currencyCode: string) {
    return this.temperatureRepository.getLastComputerTemperatures(
      currencyCode,
      COUNT_LAST_ITEMS,
    )
  }
}
