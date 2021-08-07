import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { Temperature } from './Temperature';

@Entity({ name: 'computer' })
export class Computer {
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
    () => Temperature,
      temperature => temperature.computer,
    { nullable: false },
  )
  public temperatures: Temperature[];
}

