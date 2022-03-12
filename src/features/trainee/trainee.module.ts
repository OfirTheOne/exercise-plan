import { Module } from '@nestjs/common';
import { TraineeController } from './trainee.controller';
import { TraineeRepository } from './trainee.repository';
import { TraineeService } from './trainee.service';

@Module({
  controllers: [TraineeController],
  providers: [TraineeService, TraineeRepository],
})
export class TraineeModule {}
