import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptModule } from './gpt/gpt.module';
import { IntentionsService } from './gpt/intentions.service';

@Module({
  imports: [GptModule],
  controllers: [AppController],
  providers: [AppService, IntentionsService],
})
export class AppModule {}
