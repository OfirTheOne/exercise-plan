
import { Collection, Db, MongoClient } from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MONGODB_PROVIDER } from './constants';
import { ConfigSchema } from '../config.schema';
import { ExerciseEntity } from '../../types/entities/exercise.entity';
import { PlanEntity } from '../../types/entities/plan.entity';
import { TraineeEntity } from '../..//types/entities/trainee.entity';

export enum CollectionNames {
  EXERCISE = 'exercise',
  PLAN = 'plan',
  TRAINEE = 'trainee'
}

interface CollectionEntityMap  {
  [CollectionNames.EXERCISE]: ExerciseEntity
  [CollectionNames.PLAN]: PlanEntity
  [CollectionNames.TRAINEE]: TraineeEntity
}

@Injectable()
export class MongoService implements OnModuleInit {

  private db?: Db;
  readonly pageSize: number;

  constructor(
      @Inject(MONGODB_PROVIDER) private mongoClient: typeof MongoClient,
    private configService: ConfigService<ConfigSchema>,
    private logger: Logger) {
    this.pageSize = +this.configService.get('PAGE_SIZE', 20);
  }

  async onModuleInit(): Promise<void> {
    try {
      this.logger.log('[MongoService:onModuleInit] starting initConnection.');
      await this.initConnection();
    } catch (_e) {
      this.logger.error('[MongoService:onModuleInit] Error: %s.', { messageParams: [(_e as Error).message]});
      process.exit(1);
    }
  }

  async initConnection(): Promise<void> {
    try {
      this.logger.debug('[MongoService:initConnection] ...');
      if (!this.db) {
        this.logger.debug('[MongoService:initConnection] first time call, initializing new connection');
        const url = this.configService.get('PRIMARY_CONNECTION_STRING');
        const dbName = this.configService.get('DB_NAME');
        if (url === undefined || dbName === undefined) {
          this.logger.error('[MongoService:initConnection] no db url or db name config for db');
          throw new Error('no db url or db name config for db');
        }
        this.logger.debug('[MongoService:initConnection] db connection initialized for %s', { messageParams: [dbName] });
        const client = await this.mongoClient.connect(url);
        this.db = client.db(dbName);
        this.db.collection('basemaps');

        this.logger.debug('[MongoService:initConnection] db connection initialized successfully');
      }
    } catch (error) {
      const typedError = error as Error;
      this.logger.error('[MongoService:initConnection] error initializing db connection: %s', { messageParams: [typedError.message] });
      throw error;
    }
  }

  async isConnected(): Promise<boolean> {    
    if (!this.db) {
      this.logger.error('connection to db is not initialized');
      return false;
    }
    try {
      const d = await this.db.stats();
      return d.collections != 0;
    } catch (error) {
      const typedError = error as Error;
      this.logger.error('[MongoService:isConnected] db is not connected: %s', { messageParams: [typedError.message] });
      return false;
    }
  }

  getCollection<
    E extends CollectionEntityMap[C], 
    C extends CollectionNames = CollectionNames
  >(collectionName: CollectionNames): Collection<E> {
    if (!this.db) {
      this.logger.error('connection to db is not initialized');
      throw new Error('connection to db is not initialized');
    }
    return this.db!.collection(collectionName);
  }

}
