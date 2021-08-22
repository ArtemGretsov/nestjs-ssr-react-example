import { Global, Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiKeyRepository } from '../../database/repositories/api-key.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ApiKeyRepository]),
  ],
  exports: [ApiKeyService],
  providers: [ApiKeyService],
})
export class ApiKeyModule {}