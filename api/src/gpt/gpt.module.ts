import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { IntentionsService } from './intentions.service';
import { IntentionsController } from './intentions.controller';

@Module({
  providers: [GptService, IntentionsService],
  controllers: [IntentionsController],
})
export class GptModule {}
