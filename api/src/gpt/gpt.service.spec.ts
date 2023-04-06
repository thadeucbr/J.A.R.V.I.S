import { Test, TestingModule } from '@nestjs/testing';
import { GptService } from './gpt.service';
import axios from 'axios';

jest.mock('axios');

describe('GptService', () => {
  let service: GptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GptService],
    }).compile();

    service = module.get<GptService>(GptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get GPT-4 response', async () => {
    const context = [
      { role: 'system', content: 'Test system message' },
      { role: 'user', content: 'Test user message' },
    ];
    const completion = 'Test GPT-4 completion';

    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        choices: [
          {
            message: {
              content: completion,
            },
          },
        ],
      },
    });

    const result = await service.getGPT4Response(context);
    expect(result).toEqual(completion);
    expect(axios.post).toHaveBeenCalled();
  });
});
