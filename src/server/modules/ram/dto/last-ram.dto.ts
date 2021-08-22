import { ApiProperty } from "@nestjs/swagger";

export class LastRamDto {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly dateCreate: Date;

  @ApiProperty()
  public readonly value: number;

  @ApiProperty()
  public readonly total: number;
}