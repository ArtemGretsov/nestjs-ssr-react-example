import {
  Controller,
  Get,
  Render,
} from '@nestjs/common';
import { SsrService } from './ssr.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('ssr')
export class SsrController {
  constructor(
    private readonly ssrService: SsrService,
  ) { }

  @Get()
  @Render('pages/home')
  public async renderHome() {
    return this.ssrService.getHomeData();
  }
}
