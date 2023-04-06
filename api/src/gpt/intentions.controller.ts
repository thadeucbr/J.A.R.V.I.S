import { Controller, Post, Body } from '@nestjs/common';
import { IntentionsService } from './intentions.service';

@Controller('intentions')
export class IntentionsController {
  constructor(private intentionsService: IntentionsService) {}

  @Post()
  async detectIntent(@Body('userInput') userInput: string) {
    return await this.intentionsService.detectIntent(userInput);
  }
}
