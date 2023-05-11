import { Test, TestingModule } from '@nestjs/testing';
import { SaintSoulsController } from './saint_souls.controller';

describe('SaintSoulsController', () => {
  let controller: SaintSoulsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaintSoulsController],
    }).compile();

    controller = module.get<SaintSoulsController>(SaintSoulsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
