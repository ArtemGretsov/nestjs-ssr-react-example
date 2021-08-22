import { Injectable } from '@nestjs/common';
import { TemperatureService } from '../temperature/temperature.service';

@Injectable()
export class SsrService {
  constructor(
    private readonly temperatureService: TemperatureService,
  ) { }

  public async getHomeData() {
    const [
      temperatures,
    ] = await Promise.all([
      this.temperatureService.getLast('home')
    ])

    return {
      temperatures,
    }
  }
}