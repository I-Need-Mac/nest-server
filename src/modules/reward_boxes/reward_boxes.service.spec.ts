import { Test, TestingModule } from '@nestjs/testing';
import { RewardBoxesService } from './reward_boxes.service';

describe('RewardBoxesService', () => {
  let service: RewardBoxesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardBoxesService],
    }).compile();

    service = module.get<RewardBoxesService>(RewardBoxesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
