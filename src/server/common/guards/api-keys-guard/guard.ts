import * as crypto from 'crypto';
import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { API_KEY_HEADER, SECRET_KEY_HEADER } from './headers';
import { ApiKeyService } from '../../../modules/api-key/api-key.service';

@Injectable()
export class Guard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => ApiKeyService))
    private readonly apiKeyService: ApiKeyService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const computerCode = request.query.computerCode || request.body.computerCode;
    const apiKey = request.headers[API_KEY_HEADER];
    const secretKey = request.headers[SECRET_KEY_HEADER];

    const key = await this.apiKeyService.findByComputerCode(computerCode, {
      apiKey,
    });

    if (!key) {
      return false;
    }

    const hashSecretKey = crypto.createHmac('sha256', key.salt)
      .update(secretKey)
      .digest('hex');

    return hashSecretKey === key.secretKey;
  }
}
