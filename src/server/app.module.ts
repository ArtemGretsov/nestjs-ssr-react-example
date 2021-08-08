import { Module } from '@nestjs/common';
import config from 'config';
import path from "path";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureModule } from './modules/temperature/temperature.module';
import { SseModule } from './modules/sse/sse.module';
import { SsrModule } from './modules/ssr/ssr.module';
import { ServeStaticModule } from "@nestjs/serve-static";

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
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'static'),
    }),
    SseModule,
    SsrModule,
    TemperatureModule,
  ],
})
export class AppModule {}
