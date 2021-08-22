import { Module } from '@nestjs/common';
import config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureModule } from './modules/temperature/temperature.module';
import { SseModule } from './modules/sse/sse.module';
import { SsrModule } from './modules/ssr/ssr.module';
import { RamModule } from './modules/ram/ram.module';

const TYPEORM_CONFIG: object = config.get('typeorm');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TYPEORM_CONFIG,
      cli: {
        entitiesDir: __dirname + '/database/entities',
        migrationsDir: __dirname + '/database/migration',
      },
      entities: [__dirname + '/database/entities/*{.ts,.js}'],
      migrations: [__dirname + '/database/migration/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      subscribers: [__dirname + '/database/subscriber/*{.ts,.js}'],
      synchronize: true,
    }),
    SseModule,
    SsrModule,
    TemperatureModule,
    RamModule,
  ],
})
export class AppModule {}
