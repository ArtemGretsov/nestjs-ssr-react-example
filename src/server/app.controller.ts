import {
  Controller,
  Get,
  Render,
} from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  public showHomePage() {
    return {
      message: 'Hello NestJS!!!!!!!!!!',
    };
  }
}
