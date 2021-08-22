import {EntityManager, EntityRepository, FindConditions, Repository} from 'typeorm';
import { NotFoundException } from "@nestjs/common";
import { ApiKeyEntity } from '../entities/api-key.entity';
import { ComputerRepository } from './computer.repository';

@EntityRepository(ApiKeyEntity)
export class ApiKeyRepository extends Repository<ApiKeyEntity> {
  private readonly computerRepository: ComputerRepository;

  constructor(
    public readonly manager: EntityManager,
    computerRepository?: ComputerRepository,
  ) {
    super()

    if (computerRepository) {
      this.computerRepository = this.manager.getCustomRepository(ComputerRepository);
    }
  }

  public async findByComputerCode(computerCode: string, condition: FindConditions<ApiKeyEntity>): Promise<ApiKeyEntity | undefined> {
    const computer = await this.computerRepository.findOne({ code: computerCode });

    if (!computer) {
      throw new NotFoundException('ComputerEntity not found')
    }

    return this.findOne({
      ...condition,
      computer,
    })
  }
}