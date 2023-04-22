import { Test, TestingModule } from '@nestjs/testing';
import { SoulsController } from './souls.controller';

describe('SoulsController', () => {
  let controller: SoulsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoulsController],
    }).compile();

    controller = module.get<SoulsController>(SoulsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
