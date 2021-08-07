import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, ManyToOne } from 'typeorm';
import { Computer } from './Computer';

@Entity({ name: 'temperature' })
export class Temperature {
  @PrimaryGeneratedColumn()
  public id: number;

  @Index()
  @CreateDateColumn()
  public dateCreate: Date;

  @Column({ type: 'float4' })
  public value: number;

  @ManyToOne(() => Computer, computer => computer.temperatures)
  public computer: Computer;
}
