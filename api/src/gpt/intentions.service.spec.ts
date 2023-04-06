import { Test, TestingModule } from '@nestjs/testing';
import { IntentionsService } from './intentions.service';
import { GptService } from './gpt.service';

describe('IntentionsService', () => {
  let service: IntentionsService;
  let gptService: GptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntentionsService, GptService],
    }).compile();

    service = module.get<IntentionsService>(IntentionsService);
    gptService = module.get<GptService>(GptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should detect valid intent', async () => {
    const userInput = 'turn on the light';
    const gptResponse = 'ewelink_action';

    jest.spyOn(gptService, 'getGPT4Response').mockResolvedValue(gptResponse);

    const result = await service.detectIntent(userInput);
    expect(result.gptResponse).toEqual(gptResponse);
    expect(result.userInput).toEqual(userInput);
    expect(gptService.getGPT4Response).toHaveBeenCalled();
  });

  it('should detect invalid intent and return general_knowledge', async () => {
    const userInput = 'some random input';
    const gptResponse = 'invalid_intent';

    jest.spyOn(gptService, 'getGPT4Response').mockResolvedValue(gptResponse);

    const result = await service.detectIntent(userInput);
    expect(result.gptResponse).toEqual('general_knowledge');
    expect(result.userInput).toEqual(userInput);
    expect(gptService.getGPT4Response).toHaveBeenCalled();
  });
});
