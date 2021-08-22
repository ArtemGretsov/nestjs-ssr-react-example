import { applyDecorators, UseGuards } from '@nestjs/common';
import { Guard } from './guard';
import { ApiHeaders, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PUBLIC_HEADERS } from './headers';

export const ApiKeysGuard = () => {
  return applyDecorators(

    UseGuards(Guard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiHeaders(PUBLIC_HEADERS)
  );
}