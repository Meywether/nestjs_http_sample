import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';

const errorLogPath = __dirname + '/../logs/application-%DATE%.error.log';
const infoLogPath = __dirname + '/../logs/application-%DATE%.info.log';
const debugLogPath = __dirname + '/../logs/application-%DATE%.debug.log';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          format: winston.format.json(),
          datePattern: 'YYYY-MM-DD-HH',
          filename: errorLogPath,
          level: 'error',
          zippedArchive: true,
          maxFiles: '365d',
        }),
        new winston.transports.DailyRotateFile({
          format: winston.format.json(),
          datePattern: 'YYYY-MM-DD-HH',
          filename: infoLogPath,
          level: 'info',
          zippedArchive: true,
          maxFiles: '365d',
        }),
        new winston.transports.DailyRotateFile({
          format: winston.format.json(),
          datePattern: 'YYYY-MM-DD-HH',
          filename: debugLogPath,
          level: 'debug',
          zippedArchive: true,
          maxFiles: '365d',
        }),
        // other transports...
      ],
    }),
  });
  const configService = app.get(ConfigService);

  await app.listen(configService.get('server_port')).then(() => {
    console.log(`Server listening on port ${configService.get('server_port')}`);
  });
}
bootstrap();
