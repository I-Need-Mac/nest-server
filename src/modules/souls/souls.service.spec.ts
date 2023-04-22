import { Test, TestingModule } from '@nestjs/testing';
import { SoulsService } from './souls.service';

describe('SoulsService', () => {
  let service: SoulsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoulsService],
    }).compile();

    service = module.get<SoulsService>(SoulsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
