import { Controller, Get, Head, HttpCode, Logger } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  constructor(private logger: Logger) {}

  @Get()
  @Head()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Picasso micro-service online check',
  })
  isAlive(): void {
    this.logger.log('Checked Picasso online status. Ignite is online');
    return;
  }
}
