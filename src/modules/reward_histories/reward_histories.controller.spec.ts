import { Test, TestingModule } from '@nestjs/testing';
import { RewardHistoriesController } from './reward_histories.controller';

describe('RewardHistoriesController', () => {
  let controller: RewardHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardHistoriesController],
    }).compile();

    controller = module.get<RewardHistoriesController>(RewardHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
