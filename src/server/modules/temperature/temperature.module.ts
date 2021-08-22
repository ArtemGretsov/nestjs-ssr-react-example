import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SseModule } from '../sse/sse.module';
import { TemperatureRepository } from '../../database/repositories/Temperature';
import { TemperatureService } from './temperature.service';
import { TemperatureController } from './temperature.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemperatureRepository]),
    SseModule,
  ],
  providers: [TemperatureService],
  controllers: [TemperatureController],
  exports: [TemperatureService]
})
export class TemperatureModule {}
