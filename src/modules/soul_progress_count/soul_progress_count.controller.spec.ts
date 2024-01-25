import { Test, TestingModule } from '@nestjs/testing';
import { SoulProgressCountController } from './soul_progress_count.controller';

describe('SoulsCountController', () => {
  let controller: SoulProgressCountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoulProgressCountController],
    }).compile();

    controller = module.get<SoulProgressCountController>(SoulProgressCountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
