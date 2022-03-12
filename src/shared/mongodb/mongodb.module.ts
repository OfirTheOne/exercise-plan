import { Logger, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MONGODB_PROVIDER } from './constants';
import { MongoService } from './mongodb.provider';

@Module({
  providers: [
    MongoService,
    {
      provide: MONGODB_PROVIDER,
      useValue: MongoClient
    },
    {
      provide: Logger,
      useValue: new Logger(),
    },
  ],
  exports: [
    MongoService,
    {
      provide: MONGODB_PROVIDER,
      useValue: MongoClient
    }
  ],
})
export class MongoDbModule {}
