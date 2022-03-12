import { TraineeController } from './trainee.controller';
import { TraineeService } from './trainee.service';

describe('TraineeController', () => {
  let controller: TraineeController;

  const mockTraineeService : Partial<TraineeService> = {
    getAllTrainees: jest.fn() 
  };

  beforeEach(async () => {
    controller = new TraineeController(
      mockTraineeService as TraineeService
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
