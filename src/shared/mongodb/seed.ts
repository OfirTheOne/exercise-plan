import { faker } from '@faker-js/faker';
import { InsertManyResult, MongoClient } from 'mongodb';
import { ExerciseEntity } from '../../types/entities/exercise.entity';
import { PlanEntity } from '../../types/entities/plan.entity';
import { Gender, TraineeEntity } from '../../types/entities/trainee.entity';
import { CollectionNames } from './mongodb.provider';

const DB_NAME = 'dev';
const URI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const USE_RANDOM_DATA = false;

function safeAccess<T>(arr: Array<T>, i: number): T {
    return arr[i % arr.length];
}

async function insertDocuments(client: MongoClient, docs: Array<Record<string, unknown>>, collectionName: string): Promise<InsertManyResult<Document>> {
    const collection = client.db(DB_NAME).collection(collectionName);
    try {
        await collection.drop();
    } catch (error) {
        console.log(error);
    }
    return await collection.insertMany(docs);
}

async function seedDb() {
    let client: MongoClient;
    try {
        client = await MongoClient.connect(URI);
        console.log("Connected correctly to server");
    } catch (error) {
        console.log(error);
        throw error;
    }
    const sets = [8, 12];
    const weight = new Array(10).fill(0).map((_v, i) => (i + 1) * 5);

    const trainees: TraineeEntity[] = [
        {
            id: '9be2fa85-e973-4d93-a19e-000d2f38e8da',
            name: USE_RANDOM_DATA ? faker.name.firstName() : 'John',
            gender: Gender.MALE
        },
        {
            id: '9be2fa85-e973-4d93-a19e-000d2f38e8db',
            name: USE_RANDOM_DATA ? faker.name.firstName() : 'Bob',
            gender: Gender.MALE
        },
        {
            id: '9be2fa85-e973-4d93-a19e-000d2f38e8dc',
            name: USE_RANDOM_DATA ? faker.name.firstName() : 'Nadav Ha Homo',
            gender: Gender.MALE
        }
    ];
    const traineesInsertedResult = await insertDocuments(
        client,
        trainees as unknown as Record<string, unknown>[],
        CollectionNames.TRAINEE);

    console.log(`Trainee seeded - ${traineesInsertedResult.insertedCount} document inserted.`);

    const exercises: ExerciseEntity[] = [
        {
            id: '645a15ec-a9af-4145-8051-71abf04a9f20',
            label: 'Lunges',
            muscles: [] as string[],
        },
        {
            id: '645a15ec-a9af-4145-8051-71abf04a9f21',
            label: 'Pushups',
            muscles: [] as string[],
        },
        {
            id: '645a15ec-a9af-4145-8051-71abf04a9f22',
            label: 'Squats',
            muscles: [] as string[],
        },
        {
            id: '645a15ec-a9af-4145-8051-71abf04a9f23',
            label: 'Standing overhead dumbbell presses',
            muscles: [] as string[],
        },
        {
            id: '645a15ec-a9af-4145-8051-71abf04a9f24',
            label: 'Dumbbell rows',
            muscles: [] as string[],
        },
        {
            id: '645a15ec-a9af-4145-8051-71abf04a9f25',
            label: 'Single-leg deadlifts',
            muscles: [] as string[],
        }
    ];
    const exercisesInsertedResult = await insertDocuments(
        client,
        exercises as unknown as Record<string, unknown>[],
        CollectionNames.EXERCISE);
    console.log(`Exercise seeded - ${exercisesInsertedResult.insertedCount} document inserted.`);

    const plans: PlanEntity[] = [
        {
            id: '151c0228-3f80-45a5-807c-6afd53cdb616',
            traineeId: safeAccess(trainees, 0).id,
            exercises: [{
                exerciseId: safeAccess(exercises, 0).id,
                weight: safeAccess(weight, 2),
                sets: safeAccess(sets, 0)
            }],
            assignedDate: USE_RANDOM_DATA ? faker.date.past() : new Date('01/02/2022')
        },
        {
            id: '151c0228-3f80-45a5-807c-6afd53cdb617',
            traineeId: safeAccess(trainees, 1).id,
            exercises: [{
                exerciseId: safeAccess(exercises, 0).id,
                weight: safeAccess(weight, 4),
                sets: safeAccess(sets, 0)
            }, {
                exerciseId: safeAccess(exercises, 1).id,
                weight: safeAccess(weight, 5),
                sets: safeAccess(sets, 1)
            }],
            assignedDate: USE_RANDOM_DATA ? faker.date.past() : new Date('05/02/2022')
        },
        {
            id: '151c0228-3f80-45a5-807c-6afd53cdb618',
            traineeId: safeAccess(trainees, 2).id,
            exercises: [{
                exerciseId: safeAccess(exercises, 4).id,
                weight: safeAccess(weight, 5),
                sets: safeAccess(sets, 1)
            }, {
                exerciseId: safeAccess(exercises, 2).id,
                weight: safeAccess(weight, 2),
                sets: safeAccess(sets, 0)
            }],
            assignedDate: USE_RANDOM_DATA ? faker.date.past() : new Date('25/01/2022')
        }
    ];
    const plansInsertedResult = await insertDocuments(
        client,
        plans as unknown as Record<string, unknown>[],
        CollectionNames.PLAN);
    console.log(`Plan seeded - ${plansInsertedResult.insertedCount} document inserted.`);
    
    console.log(`Database seeded seccusfuly.`);
    await client.close();
    console.log(`Client closed.`);

}


seedDb();