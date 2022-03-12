import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

export class ExerciseDto {
  @ApiProperty({ required: true, type: 'string', description: 'uuid', example: 'de13e401-81a7-4cfc-8de7-b70a7a8af756' })
  @IsUUID()
  id: string = ''; 

  @ApiProperty({ required: true, type: 'string', example: 'World Street Map' })
  @IsString()
  label: string = '';  

  @ApiProperty({ required: true, type: 'string', example: 'World Street Map (Support Night version)' })
  @IsString()
  description?: string = '';  
  
  @ApiProperty({ isArray: true, required: true, type: 'string', description: 'muscles list' })
  @IsString({ each: true })
  muscles: string[] = [];  
}
