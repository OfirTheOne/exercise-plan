import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';

describe('PlanController', () => {
  let controller: PlanController;

  const mockPlanService : Partial<PlanService> = {
    getAllPlans: jest.fn() 
  };

  beforeEach(async () => {
    controller = new PlanController(
      mockPlanService as PlanService
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
