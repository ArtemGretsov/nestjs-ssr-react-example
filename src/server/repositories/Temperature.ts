import {EntityManager, EntityRepository, Repository} from 'typeorm';
import { Temperature } from '../entities/Temperature';
import { ComputerRepository } from "./Computer";

@EntityRepository(Temperature)
export class TemperatureRepository extends Repository<Temperature> {
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

  async createAndSave(data: Partial<Temperature> & { computerCode: string }): Promise<Temperature> {
    const temperature = new Temperature();
    Object.assign(temperature, data);
    temperature.computer = await this.computerRepository.findBindCode(data.computerCode);

    return this.manager.save(temperature);
  }

  async getLastComputerTemperatures(computerCode: string, limit: number): Promise<Temperature[]> {
    await this.computerRepository.findBindCode(computerCode);

    return this.manager
      .getRepository(Temperature)
      .createQueryBuilder('temperature')
      .innerJoin('temperature.computer', 'computer')
      .where('computer.code = :computerCode', { computerCode })
      .orderBy('temperature.dateCreate', 'DESC')
      .limit(limit)
      .getMany();
  }
}