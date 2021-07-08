import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
