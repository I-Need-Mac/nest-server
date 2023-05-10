import { Test, TestingModule } from '@nestjs/testing';
import { SaintSoulsService } from './saint_souls.service';

describe('SaintSoulsService', () => {
  let service: SaintSoulsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaintSoulsService],
    }).compile();

    service = module.get<SaintSoulsService>(SaintSoulsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
