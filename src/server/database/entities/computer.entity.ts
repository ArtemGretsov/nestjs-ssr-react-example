import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { TemperatureEntity } from './temperature.entity';
import { ApiKeyEntity } from './api-key.entity';
import { RamEntity } from './ram.entity';

@Entity({ name: 'computers' })
export class ComputerEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  @Index({ unique: true })
  public code: string;

  @Column()
  public isActive: boolean;

  @OneToMany(
    () => TemperatureEntity,
    temperature => temperature.computer,
    { nullable: false },
  )
  public temperatures: TemperatureEntity[];

  @OneToMany(
    () => RamEntity,
    ram => ram.computer,
    { nullable: false },
  )
  public ram: RamEntity[];

  @OneToMany(
    () => ApiKeyEntity,
    apiKey => apiKey.computer,
    { nullable: false },
  )
  public apiKeys: ApiKeyEntity[];
}

