import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ComputerEntity } from './computer.entity';

@Entity({ name: 'api_keys' })
export class ApiKeyEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public apiKey: string;

  @Column()
  public secretKey: string;

  @Column()
  public salt: string;

  @ManyToOne(
    () => ComputerEntity,
      computer => computer.apiKeys,
    { nullable: false },
  )
  public computer: ComputerEntity;
}
