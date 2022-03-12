import { Injectable, Logger } from '@nestjs/common';
import { Collection } from 'mongodb';
import { MongoService, CollectionNames } from '../../shared/mongodb/mongodb.provider';
import { TraineeEntity } from '../../types/entities/trainee.entity';

@Injectable()
export class TraineeRepository {

  public get collection(): Collection<TraineeEntity> {
    return this.mongoService.getCollection(CollectionNames.TRAINEE);
  }

  constructor(
    private logger: Logger,
    private readonly mongoService: MongoService,
  ) { }

  async getAll(): Promise<TraineeEntity[]> {
    this.logger.debug('[TraineeRepository:getAll] enter.');
    try {
      const collection = this.collection;
      const allRecords = await collection.find<TraineeEntity>({}).toArray();
      this.logger.debug(`[TraineeRepository:getAll] result entities ${allRecords.map(({ id }) => ({ id }))
        }`);
      return allRecords;
    } catch (error) {
      this.logger.error(`[TraineeRepository:getAll] Error ${(error as Error).message}`);
      throw error;
    }
  }

}
