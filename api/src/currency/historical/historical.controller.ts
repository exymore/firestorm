import { Controller } from '@nestjs/common';
import { HistoricalService } from './historical.service';

@Controller('currency/historical')
export class HistoricalController {
  constructor(private readonly historicalService: HistoricalService) {}
}
