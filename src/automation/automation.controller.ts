import { Controller, Post, Body } from '@nestjs/common';
import { AutomationService } from './automation.service';

@Controller('test-automation')
export class AutomationController {

  constructor(private readonly automationService: AutomationService) {}

  @Post()
  async test(@Body() body: any) {
    return this.automationService.submitLead(body);
  }
}
