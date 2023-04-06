import { Test, TestingModule } from '@nestjs/testing';
import { GptService } from './gpt.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

  it('should return a response from GPT-4', async () => {
    const context = [{ role: 'user', content: 'tell me a joke' }];

    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content:
                'Why did the chicken cross the road? To get to the other side!',
            },
          },
        ],
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await service.getGPT4Response(context);

    expect(result).toBe(
      'Why did the chicken cross the road? To get to the other side!',
    );
    expect(mockedAxios.post).toHaveBeenCalled();
  });
});
