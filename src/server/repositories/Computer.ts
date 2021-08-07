import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from "@nestjs/common";
import { Computer } from '../entities/Computer';

@EntityRepository(Computer)
export class ComputerRepository extends Repository<Computer> {
  public async findBindCode(code: string): Promise<Computer> {
    const computer = await this.findOne({ code })

    if (!computer) {
      throw new NotFoundException('Computer not found')
    }

    return computer;
  }
}