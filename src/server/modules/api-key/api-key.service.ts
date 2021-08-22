import { Injectable } from '@nestjs/common';
import { ApiKeyRepository } from '../../database/repositories/api-key.repository';
import {FindConditions} from "typeorm";
import {ApiKeyEntity} from "../../database/entities/api-key.entity";

@Injectable()
export class ApiKeyService {
  constructor(
    private readonly apiKeyRepository: ApiKeyRepository,
  ) { }

  public findByComputerCode(
    computerCode: string,
    condition: FindConditions<ApiKeyEntity>
  ): Promise<ApiKeyEntity | undefined> {
    return this.apiKeyRepository.findByComputerCode(
      computerCode,
      condition,
    )
  }
}