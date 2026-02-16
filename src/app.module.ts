import { Module } from '@nestjs/common';
import { BridgeModule } from './bridge/bridge.module';
import { OrchestratorModule } from './orchestrator/orchestrator.module';
import { SupabaseModule } from './supabase/supabase.module';
import { OrchestratorService } from './orchestrator/orchestrator.service';

import { AutomationModule } from './automation/automation.module';
@Module({
  imports: [BridgeModule, OrchestratorModule, SupabaseModule, AutomationModule],
  providers: [OrchestratorService],
})
export class AppModule {}
