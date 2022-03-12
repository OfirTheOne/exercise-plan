import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TraineeDto } from '../../types/dtos/trainee.dto';
import { TraineeService } from './trainee.service';

@Controller('trainee')
export class TraineeController {
  constructor(private traineeService: TraineeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all trainees'
  })
  @ApiOkResponse({ description: '', type: [TraineeDto] })
  getAllTrainees(): Promise<TraineeDto[]> {
    return this.traineeService.getAllTrainees();
  }
}
