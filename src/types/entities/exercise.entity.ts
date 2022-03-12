import * as ObjectID from 'mongodb';


export class ExerciseEntity {
  _id?: ObjectID.ObjectId;
  id: string = '';       
  label: string = '';     
  description?: string = '';    
  muscles: string[] = [];   
}

