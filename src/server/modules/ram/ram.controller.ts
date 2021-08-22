import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { RamService } from './ram.service';
import { LastRamDto } from './dto/last-ram.dto';
import { RamAddingRequestDto } from './dto/ram-adding.dto';

@Controller('ram')
@ApiTags('ram')
export class RamController {
  constructor(
    private readonly ramService: RamService,
  ) { }

  @Post()
  public async save(
    @Body() body: RamAddingRequestDto,
  ) {
    await this.ramService.save(body);
  }

  @Get()
  @ApiOkResponse({
    type: LastRamDto,
    isArray: true,
  })
  public getLast(
    @Query('computerCode') computerCode: string,
  ) {
    return this.ramService.getLast(computerCode)
  }
}
