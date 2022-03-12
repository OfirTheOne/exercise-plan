import { Injectable, Logger } from '@nestjs/common';
import { Collection } from 'mongodb';
import { MongoService, CollectionNames } from '../../shared/mongodb/mongodb.provider';
import { ExerciseEntity } from '../../types/entities/exercise.entity';

@Injectable()
export class ExerciseRepository {

  public get collection(): Collection<ExerciseEntity> {
    return this.mongoService.getCollection(CollectionNames.EXERCISE);
  }

  constructor(
    private logger: Logger,
    private readonly mongoService: MongoService,
  ) { }

  async getAll(): Promise<ExerciseEntity[]> {
    this.logger.debug('[ExerciseRepository:getAll] enter.');
    try {
      const collection = this.collection;
      const allRecords = await collection.find({}).toArray();
      this.logger.debug(`[ExerciseRepository:getAll] result entities ${
        allRecords.map(({ id, label}) => ({id, label}))
      }`);
      return allRecords;
    } catch (error) {
      this.logger.error(`[ExerciseRepository:getAll] Error ${(error as Error).message}`);
      throw error;
    }
  }
}
