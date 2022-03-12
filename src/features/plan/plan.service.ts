import { Injectable, Logger } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import { PlanDto } from '../../types/dtos/plan.dto';
import { TraineeDto } from '../../types/dtos/trainee.dto';
import { PlanEntity } from 'src/types/entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(
    private readonly exerciseRepository: PlanRepository,
    private readonly logger: Logger,
  ) { }

  async getPlans(traineeIds?: Array<string>): Promise<PlanDto[]> {
    this.logger.debug('[PlanService:getPlansByTrainees] enter.');
    try {
      const allPlanEntities = await this.exerciseRepository.getPlans(traineeIds);
      this.logger.debug(`[PlanService:getPlansByTrainees] result entities ${allPlanEntities.map(({ id }) => ({ id }))
        }`);
      return allPlanEntities.map<PlanDto>(plan => PlanService.planEntityToDto(plan));
    } catch (error) {
      this.logger.error(`[PlanService:getPlansByTrainees] Error ${(error as Error).message}`);
      throw error;
    }
  }

  static planEntityToDto(planEntity: PlanEntity): PlanDto {
    return {
      id: planEntity.id,
      assignedDate: planEntity.assignedDate,
      trainee: planEntity.traineeRef || new TraineeDto(),
      comment: planEntity.comment,
      exercises: planEntity.exercises.map(exercise => ({
        label: exercise?.exerciseRef?.label || '',
        description: exercise?.exerciseRef?.description || '',
        muscles: exercise?.exerciseRef?.muscles || [],
        id: exercise.exerciseId,
        comment: exercise.comment,
        sets: exercise.sets,
        weight: exercise.weight,
      }))
    }
  }
}
