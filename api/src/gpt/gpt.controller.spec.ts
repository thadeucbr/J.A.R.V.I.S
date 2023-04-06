import { Test, TestingModule } from '@nestjs/testing';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';
import { IntentionsService } from './intentions.service';

describe('GptController', () => {
  let controller: GptController;
  let gptService: GptService;
  let intentionsService: IntentionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GptController],
      providers: [GptService, IntentionsService],
    }).compile();

    controller = module.get<GptController>(GptController);
    gptService = module.get<GptService>(GptService);
    intentionsService = module.get<IntentionsService>(IntentionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call generalGPTConversation', async () => {
    const userInput = 'tell me a joke';
    const gptResponse = 'This is a funny joke';

    jest.spyOn(gptService, 'getGPT4Response').mockResolvedValue(gptResponse);

    const result = await controller.generalGPTConversation(userInput);
    expect(result.response).toEqual(gptResponse);
    expect(gptService.getGPT4Response).toHaveBeenCalled();
  });

  it('should call detectIntent', async () => {
    const userInput = 'turn on the light';
    const gptResponse = 'ewelink_action';

    jest.spyOn(intentionsService, 'detectIntent').mockResolvedValue({
      gptResponse,
      userInput,
    });

    const result = await controller.detectIntent(userInput);
    expect(result.gptResponse).toEqual(gptResponse);
    expect(result.userInput).toEqual(userInput);
    expect(intentionsService.detectIntent).toHaveBeenCalled();
  });
});
