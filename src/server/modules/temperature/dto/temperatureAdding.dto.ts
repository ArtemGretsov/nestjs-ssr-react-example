import { ApiProperty } from '@nestjs/swagger';

export class TemperatureAddingRequestDto {
  @ApiProperty()
  public readonly computerCode: string;

  @ApiProperty()
  public readonly value: number;
}
