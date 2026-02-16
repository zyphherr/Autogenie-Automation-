import { Module } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { AutomationController } from './automation.controller';

@Module({
  providers: [AutomationService],
  exports: [AutomationService],
  controllers: [AutomationController],

})
export class AutomationModule {}
