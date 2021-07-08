import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { DataResponseDto } from '../dto/DataResponse.dto';
import { StatusDTO } from '../dto/status.dto.class';
@Controller('status')
export class StatusController {
  constructor(
    private readonly configService: ConfigService,
    @Inject('MICROSERVICE_1')
    private ms1: ClientProxy,
  ) {}

  @Get()
  public async getVersionsOfAllSystems(): Promise<DataResponseDto> {
    const allStatus: StatusDTO[] = [];
    const backendStatus = new StatusDTO();
    backendStatus.name = 'Sample Rest';
    backendStatus.version = await this.configService.get('server_version');
    allStatus.push(backendStatus);

    const mailStatus = await this.ms1
      .send<StatusDTO, string>('getMS1Status', '')
      .toPromise();
    allStatus.push(mailStatus);

    const dto = new DataResponseDto();
    dto.statusCode = 200;
    dto.data = allStatus;

    return dto;
  }
}
