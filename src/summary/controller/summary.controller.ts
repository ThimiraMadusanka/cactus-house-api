import { Controller, Get, Query } from '@nestjs/common';
import { Auth } from 'src/authentication/decorator/auth.decorator';
import { SummaryService } from '../service/summary.service';

@Controller('/v1/summary')
export class SummaryController {
  constructor(private summaryService: SummaryService) {}

  @Get('/admin')
  @Auth('ADMIN')
  async getAdminSummary() {
    return await this.summaryService.getAdminSummary();
  }

  @Get('/account')
  @Auth('ADMIN')
  async getAccountSummary(@Query('user_id') userId: any) {
    return await this.summaryService.getAccountSummary(userId);
  }
}
