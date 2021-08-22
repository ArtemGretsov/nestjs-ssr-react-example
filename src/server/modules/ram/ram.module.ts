import { Module } from '@nestjs/common';
import { RamService } from './ram.service';
import { RamController } from './ram.controller';
import { SseModule } from '../sse/sse.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RamRepository } from '../../database/repositories/Ram';

@Module({
  imports: [
    TypeOrmModule.forFeature([RamRepository]),
    SseModule,
  ],
  controllers: [RamController],
  providers: [RamService],
})
export class RamModule {}