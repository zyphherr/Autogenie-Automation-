import { IsString, IsNotEmpty } from 'class-validator';

export class AgentActionDto {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  vehicle: string;
}
