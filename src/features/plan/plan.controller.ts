import { Controller, Get, HttpCode, HttpStatus, ParseArrayPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PlanDto } from '../../types/dtos/plan.dto';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private planService: PlanService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search plans.'
  })
  @ApiQuery({
    name: 'trainees',
    type: [String],
    required: false,
    description: 'List of trainee ids, in standard array syntax.'
  })
  @ApiOkResponse({
    description: '',
    type: [PlanDto]
  })
  getPlans(
    @Query('trainees', new ParseArrayPipe({ optional: true, separator: ',' })) traineeIds?: Array<string>
  ): Promise<PlanDto[]> {
    return this.planService.getPlans(traineeIds);
  }
}
