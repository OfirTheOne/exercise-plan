import { Injectable, Logger } from '@nestjs/common';
import { TraineeRepository } from './trainee.repository';
import { TraineeDto } from '../../types/dtos/trainee.dto';

@Injectable()
export class TraineeService {
  constructor(
    private readonly traineeRepository: TraineeRepository,
    private readonly logger: Logger,
  ) { }

  async getAllTrainees(): Promise<TraineeDto[]> {
    this.logger.debug('[TraineeService:getAllTrainees] enter.');
    try {
      const allTraineeEntities = await this.traineeRepository.getAll();
      this.logger.debug(`[TraineeService:getAllTrainees] result entities ${allTraineeEntities.map(({ id }) => ({ id }))
        }`);
      return allTraineeEntities.map<TraineeDto>(({ _id, ...trainee }) => (trainee));
    } catch (error) {
      this.logger.error(`[TraineeService:getAllTrainees] Error ${(error as Error).message}`);
      throw error;
    }
  }
}
