import {EntityManager, EntityRepository, Repository} from 'typeorm';
import { TemperatureEntity } from '../entities/temperature.entity';
import { ComputerRepository } from "./computer.repository";

@EntityRepository(TemperatureEntity)
export class TemperatureRepository extends Repository<TemperatureEntity> {
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

  public async createAndSave(data: Partial<TemperatureEntity> & { computerCode: string }): Promise<TemperatureEntity> {
    const temperature = new TemperatureEntity();
    Object.assign(temperature, data);
    temperature.computer = await this.computerRepository.findBindCode(data.computerCode);

    return this.manager.save(temperature);
  }

  public async getLastComputerTemperatures(computerCode: string, limit: number): Promise<TemperatureEntity[]> {
    await this.computerRepository.findBindCode(computerCode);

    return this.manager
      .getRepository(TemperatureEntity)
      .createQueryBuilder('temperature')
      .innerJoin('temperature.computer', 'computer')
      .where('computer.code = :computerCode', { computerCode })
      .orderBy('temperature.dateCreate', 'DESC')
      .limit(limit)
      .getMany();
  }
}