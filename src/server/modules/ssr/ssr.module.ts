import { Module } from '@nestjs/common';
import { SsrController } from './ssr.controller';
import { SsrService } from './ssr.service';
import { TemperatureModule } from '../temperature/temperature.module';

@Module({
  imports: [TemperatureModule],
  controllers: [SsrController],
  providers: [SsrService],
})
export class SsrModule {}