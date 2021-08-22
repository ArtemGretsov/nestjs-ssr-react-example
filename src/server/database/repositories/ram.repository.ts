import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { ComputerRepository } from './computer.repository';
import { RamEntity } from '../entities/ram.entity';

@EntityRepository(RamEntity)
export class RamRepository extends Repository<RamEntity> {
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

  public async createAndSave(data: Partial<RamEntity> & { computerCode: string }): Promise<RamEntity> {
    const ram = new RamEntity();
    Object.assign(ram, data);
    ram.computer = await this.computerRepository.findBindCode(data.computerCode);

    return this.manager.save(ram);
  }

  public async getLastComputerRam(computerCode: string, limit: number): Promise<RamEntity[]> {
    await this.computerRepository.findBindCode(computerCode);

    return this.manager
      .getRepository(RamEntity)
      .createQueryBuilder('ram')
      .innerJoin('ram.computer', 'computer')
      .where('computer.code = :computerCode', { computerCode })
      .orderBy('ram.dateCreate', 'DESC')
      .limit(limit)
      .getMany();
  }
}