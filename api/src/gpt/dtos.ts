import { ApiProperty } from '@nestjs/swagger';

export class GeneralGPTConversationDto {
  @ApiProperty()
  userInput: string;
}

export class GPTConversationResponseDto {
  @ApiProperty()
  response: string;
}

export class GPTIntetionsResponseDto {
  @ApiProperty()
  gptResponse: string;
  @ApiProperty()
  userInput: string;
}
