import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ExerciseDto } from '../../types/dtos/exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all exercises'
  })
  @ApiOkResponse({ description: '', type: [ExerciseDto] })
  getAllExercises(): Promise<ExerciseDto[]> {
    return this.exerciseService.getAllExercises();
  }
}
