import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { IntentionsService } from './intentions.service';
import { GptController } from './gpt.controller';

@Module({
  providers: [GptService, IntentionsService],
  controllers: [GptController],
})
export class GptModule {}
