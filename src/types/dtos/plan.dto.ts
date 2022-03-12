import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { ExerciseDto } from './exercise.dto';
import { TraineeDto } from './trainee.dto';

export class UsedExerciseDto extends ExerciseDto {
  @ApiProperty({ required: true, type: 'number', description: 'Exercise\'s weight' }) 
  weight: number = 0;

  @ApiProperty({ required: true, type: 'number', description: 'Exercise\'s sets' }) 
  sets: number = 0;

  @ApiProperty({ required: false, type: 'string', description: 'Comments' }) 
  comment?: string
}

export class PlanDto {
  @ApiProperty({ required: true, type: 'string', description: 'uuid', example: 'de13e401-81a7-4cfc-8de7-b70a7a8af756' })
  @IsUUID()
  id: string = '';

  @ApiProperty({ required: true, type: TraineeDto, description: 'plan\'s trainee' })
  @Type(() => TraineeDto) 
  trainee: TraineeDto = new TraineeDto(); 

  @ApiProperty({ required: true, type: Date, description: 'The plan due date' }) 
  assignedDate: Date = new Date();

  @ApiProperty({ required: true, type: 'string', description: 'Comments' }) 
  comment?: string; 

  @ApiProperty({ required: true, type: [UsedExerciseDto], description: 'plan\'s exercises' })
  exercises: UsedExerciseDto[] = [];
}

