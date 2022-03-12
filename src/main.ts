import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConsoleLogger, LogLevel, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { writeFileSync } from 'fs';
import { AllExceptionsFilter } from './shared/exceptions/all-exception.filter';

async function bootstrap(): Promise<void> {
  // global configuration definition
  const app = await NestFactory.create(AppModule, {
    logger: (process.env.LOG_LEVEL || 'log,error,warn').split(',') as LogLevel[],
  });
  
  const config = app.get<ConfigService>(ConfigService);
  const listenPort = config.get<number>('LISTENING_PORT', 3030);
  const globalPrefix = config.get<string>('WEB_API_PREFIX', 'undefined');
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );


  const logger = await app.resolve<ConsoleLogger>(ConsoleLogger);
  app.setGlobalPrefix(globalPrefix);

  // swagger definition
  const options = new DocumentBuilder()
    .setTitle('exercise-plane')
    .setDescription('ExercisePlane Connector')
    .setVersion('1.0')
    .setBasePath(globalPrefix)
    .addTag('exercise-plane')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);

  app.enableCors();


  logger.log(`[bootstrap] Application started, listening to ${listenPort} port`);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(listenPort);
}
bootstrap();
