import {
  Controller,
  Get,
  Render,
} from '@nestjs/common';
import { SsrService } from './ssr.service';

@Controller()
export class SsrController {
  constructor(
    private readonly ssrService: SsrService,
  ) {
  }

  @Get()
  @Render('Home')
  public async renderHome() {
    return this.ssrService.getHomeData();
  }
}
