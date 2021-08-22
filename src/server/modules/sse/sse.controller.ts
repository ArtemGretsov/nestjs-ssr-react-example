import { Controller, Get, Res } from '@nestjs/common';
import { SseService } from './sse.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('sse')
@ApiTags('sse')
export class SseController {
  constructor(
    private readonly seeService: SseService,
  ) {}

  @Get()
  public subscribe(
    @Res() res: Response,
  ) {
    this.seeService.subscribe(res);
  }
}
