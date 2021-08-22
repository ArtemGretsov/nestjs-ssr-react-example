import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from "@nestjs/common";
import { ComputerEntity } from '../entities/computer.entity';

@EntityRepository(ComputerEntity)
export class ComputerRepository extends Repository<ComputerEntity> {
  public async findBindCode(code: string): Promise<ComputerEntity> {
    const computer = await this.findOne({ code })

    if (!computer) {
      throw new NotFoundException('ComputerEntity not found')
    }

    return computer;
  }
}