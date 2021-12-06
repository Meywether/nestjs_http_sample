import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { ConfigService } from '@nestjs/config';
import {
  RedisOptions,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';

@Module({
  providers: [
    StatusService,
    {
      provide: 'MICROSERVICE_1',
      useFactory: (configService: ConfigService) => {
        const options = <RedisOptions>{
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('redis_host'),
            port: configService.get<number>('redis_port'),
            auth_pass: configService.get<string>('redis_password'),
          },
        };
        return ClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    // {
    //   provide: 'MICROSERVICE_2',
    //   useFactory: (configService: ConfigService) => {
    //     const options = <RedisOptions>{
    //       transport: Transport.REDIS,
    //       options: {
    //         url: configService.get('redis_url'),
    //       },
    //     };
    //     return ClientProxyFactory.create(options);
    //   },
    //   inject: [ConfigService],
    // },
  ],
  controllers: [StatusController],
})
export class StatusModule {}
