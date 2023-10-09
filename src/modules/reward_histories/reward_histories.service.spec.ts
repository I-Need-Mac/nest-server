import { Test, TestingModule } from '@nestjs/testing';
import { RewardHistoriesService } from './reward_histories.service';

describe('RewardHistoriesService', () => {
  let service: RewardHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardHistoriesService],
    }).compile();

    service = module.get<RewardHistoriesService>(RewardHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
