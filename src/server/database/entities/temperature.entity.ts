import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, ManyToOne } from 'typeorm';
import { ComputerEntity } from './computer.entity';

@Entity({ name: 'temperatures' })
export class TemperatureEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @CreateDateColumn()
  public dateCreate: Date;

  @Column({ type: 'float4' })
  public value: number;

  @ManyToOne(() => ComputerEntity, computer => computer.temperatures)
  public computer: ComputerEntity;
}
