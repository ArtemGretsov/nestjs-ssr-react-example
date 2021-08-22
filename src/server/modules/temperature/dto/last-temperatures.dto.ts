import { ApiProperty } from '@nestjs/swagger';

export class LastTemperatureResponseDto {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly value: number;

  @ApiProperty()
  public readonly dateCreate: Date;
}
