import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class RamAddingRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  public readonly computerCode: string;

  @Min(0)
  @ApiProperty()
  public readonly value: number;

  @Min(0)
  @ApiProperty()
  public readonly total: number;
}