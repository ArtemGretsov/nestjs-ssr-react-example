import { Module } from '@nestjs/common';
import config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureModule } from './modules/temperature/temperature.module';
import { SseModule } from './modules/sse/sse.module';

const TYPEORM_CONFIG: object = config.get('typeorm');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...TYPEORM_CONFIG,
      cli: {
        entitiesDir: __dirname + '/entities',
        migrationsDir: __dirname + '/migration',
      },
      entities: [__dirname + '/entities/*{.ts,.js}'],
      migrations: [__dirname + '/migration/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      subscribers: [__dirname + '/subscriber/*{.ts,.js}'],
      synchronize: true,
    }),
    SseModule,
    TemperatureModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}
