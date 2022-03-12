import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

describe('ExerciseController', () => {
  let controller: ExerciseController;

  const mockExerciseService : Partial<ExerciseService> = {
    getAllExercises: jest.fn() 
  };

  beforeEach(async () => {
    controller = new ExerciseController(
      mockExerciseService as ExerciseService
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
