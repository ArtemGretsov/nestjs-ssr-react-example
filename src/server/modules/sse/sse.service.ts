import { HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Response } from 'express';
import { SseNameEnum } from '../../enums/sse-name.enum';

/* Singleton only */
@Injectable()
export class SseService {
  private readonly eventEmitter = new EventEmitter();
  private readonly eventSeeName = 'see';

  public send<T>(event: string, data: T): void {
    this.eventEmitter.emit(this.eventSeeName, { data, event });
  }

  public subscribe(res: Response): void {
    res.writeHead(HttpStatus.OK, {
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    });

    let messageId = 0;
    const listener = ({ data, event }: { data: any, event: string }): void => {
      messageId = messageId + 1;
      res.write(`data:${JSON.stringify({ data })}\n`);
      res.write(`event:${event}\n`);
      res.write(`id:${messageId}\n`);
      res.write('\n');
    };

    this.eventEmitter.on(this.eventSeeName, listener);

    res.on('close', () => {
      this.eventEmitter.removeListener(this.eventSeeName, listener);
    });
  }
}
