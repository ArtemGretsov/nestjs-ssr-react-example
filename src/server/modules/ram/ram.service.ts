import { Injectable } from '@nestjs/common';
import config from 'config';
import { SseService } from '../sse/sse.service';
import { SseNameEnum } from '../../enums/sse-name.enum';
import { RamRepository } from '../../database/repositories/Ram';
import { Ram } from '../../database/entities/Ram';

const COUNT_LAST_ITEMS: number = config.get('ram.count_last_items');

@Injectable()
export class RamService {

  constructor(
    private readonly ramRepository: RamRepository,
    private readonly sseService: SseService,
  ) { }

  public async save(
    {
     computerCode,
     value,
     total,
    }: Pick<Ram, 'value' | 'total'> & { computerCode: string }
  ): Promise<void> {
    const ram = await this.ramRepository.createAndSave({
      value,
      computerCode,
      total,
    });
    this.sseService.send(`${computerCode}/${SseNameEnum.ram}`, ram);
  }

  public async getLast(computerCode: string): Promise<Ram[]> {
    return this.ramRepository.getLastComputerRam(
      computerCode,
      COUNT_LAST_ITEMS,
    )
  }
}


