import { Injectable, Logger } from '@nestjs/common';
import { Collection } from 'mongodb';
import { MongoService, CollectionNames } from '../../shared/mongodb/mongodb.provider';
import { PlanEntity } from '../../types/entities/plan.entity';

const planPopulatedPipelines = [
  {
    '$unwind': {
      'path': '$exercises',
      'preserveNullAndEmptyArrays': true
    }
  }, {
    '$lookup': {
      'from': 'exercise',
      'localField': 'exercises.exerciseId',
      'foreignField': 'id',
      'as': 'exercises.exerciseRef'
    }
  }, {
    '$addFields': {
      'exercises.exerciseRef': {
        '$arrayElemAt': ['$exercises.exerciseRef', 0]
      }
    }
  }, {
    '$lookup': {
      'from': 'trainee',
      'localField': 'traineeId',
      'foreignField': 'id',
      'as': 'traineeRef'
    }
  }, {
    '$group': {
      '_id': '$id',
      'traineeRef': { '$first': '$traineeRef' },
      'id': { '$first': '$id' },
      'assignedDate': { '$first': '$assignedDate' },
      'exercises': { '$push': '$exercises' }
    }
  }, {
    '$project': {
      '_id': 0,
      'traineeRef': { '$first': '$traineeRef' },
      'id': 1,
      'assignedDate': 1,
      'exercises': 1
    }
  }
];

@Injectable()
export class PlanRepository {

  public get collection(): Collection<PlanEntity> {
    return this.mongoService.getCollection(CollectionNames.PLAN);
  }

  constructor(
    private logger: Logger,
    private readonly mongoService: MongoService,
  ) { }

  async getPlans(traineeIds?: Array<string>): Promise<PlanEntity[]> {
    this.logger.debug('[PlanRepository:getAll] enter.');
    try {
      const collection = this.collection;
      const pipelines = [];

      (traineeIds||[].length > 0) && pipelines.push({ $match: { traineeId: { $in: traineeIds } } });
      pipelines.push(...planPopulatedPipelines);

      const allRecords = await collection.aggregate<PlanEntity>(pipelines).toArray();
      
      this.logger.debug(`[PlanRepository:getAll] result entities ${allRecords.map(({ id }) => ({ id }))
        }`);
      return allRecords;
    } catch (error) {
      this.logger.error(`[PlanRepository:getAll] Error ${(error as Error).message}`);
      throw error;
    }
  }

  async getPlanById(planId: Array<string>): Promise<PlanEntity[]> {
    this.logger.debug('[PlanRepository:getAll] enter.');
    try {
      const collection = this.collection;
      const allRecords = await collection.aggregate<PlanEntity>([
        { $match: { id: planId } },
        ...planPopulatedPipelines
      ]).toArray();
      this.logger.debug(`[PlanRepository:getAll] result entities ${allRecords.map(({ id }) => ({ id }))
        }`);
      return allRecords;
    } catch (error) {
      this.logger.error(`[PlanRepository:getAll] Error ${(error as Error).message}`);
      throw error;
    }
  }
}
