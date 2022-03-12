import { Logger } from '@nestjs/common';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let loggerMock: Partial<Logger>;
  beforeEach(async () => {
    loggerMock = {
      debug: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };
    controller = new HealthController(loggerMock as Logger);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('healthCheckService.check should be called', async () => {
    // given
    // when
    await controller.isAlive();
    // then
    expect(loggerMock.log).toBeCalled();
  });
});
