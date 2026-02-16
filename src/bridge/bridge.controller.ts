import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrchestratorService } from '../orchestrator/orchestrator.service';
import { SupabaseService } from '../supabase/supabase.service';
import { AgentActionDto } from './dto/agent-action.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('agent')
@UseGuards(ApiKeyGuard)
export class BridgeController {
  constructor(
    private readonly orchestrator: OrchestratorService,
    private readonly supabase: SupabaseService,
  ) {}

  @Post('action')
  async handleAiAction(@Body() body: AgentActionDto) {
    console.log(`🧠 AutoGenie received: ${body.action}`);

    const result = await this.orchestrator.process(body);

    if (result.status === 'SUCCESS') {
      await this.supabase.insertTransaction({
        customer_name: body.customerName,
        vehicle: body.vehicle,
        confirmation_id: result.confirmation_id!,
      });
    }

    return result;
  }
}
