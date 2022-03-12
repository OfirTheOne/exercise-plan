import { Injectable, Logger } from '@nestjs/common';
import { ExerciseRepository } from './exercise.repository';
import { ExerciseDto } from '../../types/dtos/exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    private readonly exerciseRepository: ExerciseRepository,
    private readonly logger: Logger,
  ) { }

  async getAllExercises(): Promise<ExerciseDto[]> {
    this.logger.debug('[ExerciseService:getAllExercises] enter.');
    try {
      const allExerciseEntities = await this.exerciseRepository.getAll();
      this.logger.debug(`[ExerciseService:getAllExercises] result entities ${allExerciseEntities.map(({ id, label }) => ({ id, label }))
        }`);
      return allExerciseEntities.map<ExerciseDto>(({ _id, ...rest }) => (rest));
    } catch (error) {
      this.logger.error(`[ExerciseService:getAllExercises] Error ${(error as Error).message}`);
      throw error;
    }
  }
}
