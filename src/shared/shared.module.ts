import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';
import { MongoDbModule } from './mongodb/mongodb.module';
import { AllExceptionsFilter } from './exceptions/all-exception.filter';
import { ConsoleLogger } from "@nestjs/common";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join('config', `${process.env.ENV || 'default'}.cfg`),
      expandVariables: true,
      validationSchema: Joi.object({
        LISTENING_PORT: Joi.number().required(),
        LOG_LEVEL: Joi.string().required(),
        WEB_API_PREFIX: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIMARY_CONNECTION_STRING: Joi.string().required(),
      })
    }),

    MongoDbModule,
  ],
  providers: [
    ConsoleLogger,
    {
      provide: Logger,
      useExisting: ConsoleLogger
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [ConsoleLogger, ConfigModule, MongoDbModule, Logger],
})
export class SharedModule { }
