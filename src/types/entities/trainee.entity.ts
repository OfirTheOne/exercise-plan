import * as ObjectID from 'mongodb';

export enum Gender {
    FEMALE = 'female',
    MALE = 'male',
    NA = 'na',
}

export class TraineeEntity {
    _id?: ObjectID.ObjectId;
    id: string = '';
    name: string = '';
    gender: Gender = Gender.NA;
}

