import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const apiKey = request.header('x-agent-key');
        
        if (!process.env.AGENT_API_KEY) {
        throw new UnauthorizedException();
        }


        if (apiKey !== process.env.AGENT_API_KEY) {
            throw new UnauthorizedException('Invalid or missing API Key');
        }

        return true;
    }
}
