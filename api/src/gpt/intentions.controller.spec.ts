import { Test, TestingModule } from '@nestjs/testing';
import { IntentionsController } from './intentions.controller';
import { IntentionsService } from './intentions.service';

const mockIntentionsService = () => ({
  detectIntent: jest.fn(),
});

describe('IntentionsController', () => {
  let controller: IntentionsController;
  let intentionsService: IntentionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntentionsController],
      providers: [
        {
          provide: IntentionsService,
          useFactory: mockIntentionsService,
        },
      ],
    }).compile();

    controller = module.get<IntentionsController>(IntentionsController);
    intentionsService = module.get<IntentionsService>(IntentionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('detectIntent', () => {
    it('should call IntentionsService.detectIntent with the correct userInput', async () => {
      const userInput = 'tell me a joke';
      const expectedResult = {
        gptResponse: 'general_knowledge',
        userInput: userInput,
      };

      (intentionsService.detectIntent as jest.Mock).mockResolvedValue(
        expectedResult,
      );

      const result = await controller.detectIntent(userInput);

      expect(result).toEqual(expectedResult);
      expect(intentionsService.detectIntent).toHaveBeenCalledWith(userInput);
    });
  });
});
