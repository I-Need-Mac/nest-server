import { Test, TestingModule } from '@nestjs/testing';
import { RewardBoxesController } from './reward_boxes.controller';

describe('RewardBoxesController', () => {
  let controller: RewardBoxesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardBoxesController],
    }).compile();

    controller = module.get<RewardBoxesController>(RewardBoxesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
