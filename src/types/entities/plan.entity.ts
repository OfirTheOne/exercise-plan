import * as ObjectID from 'mongodb';
import { ExerciseEntity } from './exercise.entity';
import { TraineeEntity } from './trainee.entity';

export class UsedExerciseEntity {
  exerciseRef?: ExerciseEntity; // populated
  exerciseId: string = '';
  weight: number = 0;
  sets: number = 0;
  comment?: string
}

export class PlanEntity {
  _id?: ObjectID.ObjectId;
  id: string = '';       
  traineeId: string = '';
  traineeRef?: TraineeEntity;  // populated
  assignedDate: Date = new Date();
  comment?: string;    
  exercises: UsedExerciseEntity[] = [];   
}








