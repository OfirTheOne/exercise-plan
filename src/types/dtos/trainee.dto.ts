import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsEnum } from 'class-validator';
import { Gender } from '../entities/trainee.entity';

export class TraineeDto {
  @ApiProperty({ required: true, type: 'string', description: 'uuid', example: 'de13e401-81a7-4cfc-8de7-b70a7a8af756' })
  @IsUUID()
  id: string = '';    

  @ApiProperty({ required: true, type: 'string', example: 'Bob' })
  @IsString()
  name: string = '';   

  @ApiProperty({ required: true, type: 'string', enum: Gender,  example: Gender.MALE })
  @IsEnum(Gender)
  gender: Gender = Gender.NA;  
}
