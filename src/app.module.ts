import { Module, OnModuleInit } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { HealthModule } from './health/health.module';
import { MongoService } from './shared/mongodb/mongodb.provider';
import { ExerciseModule } from './features/exercise/exercise.module';
import { PlanModule } from './features/plan/plan.module';
import { TraineeModule } from './features/trainee/trainee.module';


@Module({
  imports: [
    SharedModule,
    HealthModule,
    ExerciseModule,
    PlanModule,
    TraineeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private mongoService: MongoService) { }

  async onModuleInit(): Promise<void> {
    try {
      await this.mongoService.initConnection();
    } catch (_e) {
      process.exit(1);
    }
  }
}
