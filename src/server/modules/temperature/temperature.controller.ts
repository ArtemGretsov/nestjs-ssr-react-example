import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { TemperatureService } from './temperature.service';
import { TemperatureAddingRequestDto } from './dto/temperatureAdding.dto';
import { LastTemperatureResponseDto } from './dto/lastTemperatures.dto';

@Controller('temperatures')
export class TemperatureController {
  constructor(
    private readonly temperatureService: TemperatureService,
  ) { }

  @Post()
  public async save(
    @Body() body: TemperatureAddingRequestDto,
  ) {
    await this.temperatureService.save(body);
  }

  @Get()
  @ApiOkResponse({
    type: LastTemperatureResponseDto,
    isArray: true,
  })
  public getLast(
    @Query('computerCode') computerCode: string,
  ) {
    return this.temperatureService.getLast(computerCode)
  }
}
