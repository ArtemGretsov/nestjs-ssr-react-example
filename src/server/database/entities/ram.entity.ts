import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ComputerEntity } from './computer.entity';


@Entity({ name: 'ram' })
export class RamEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @CreateDateColumn()
  public dateCreate: Date;

  @Column({ type: 'float4' })
  public value: number;

  @Column({ type: 'float4' })
  public total: number;

  @ManyToOne(() => ComputerEntity, computer => computer.temperatures)
  public computer: ComputerEntity;
}