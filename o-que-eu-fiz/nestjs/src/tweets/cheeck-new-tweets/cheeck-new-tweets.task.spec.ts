import { Test, TestingModule } from '@nestjs/testing';
import { CheeckNewTweetsTask } from './cheeck-new-tweets.task';

describe('CheeckNewTweetsTask', () => {
  let service: CheeckNewTweetsTask;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheeckNewTweetsTask],
    }).compile();

    service = module.get<CheeckNewTweetsTask>(CheeckNewTweetsTask);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
