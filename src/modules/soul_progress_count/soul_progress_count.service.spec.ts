import { Test, TestingModule } from '@nestjs/testing';
import { SoulProgressCountService } from './soul_progress_count.service';

describe('SoulProgressCountService', () => {
  let service: SoulProgressCountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoulProgressCountService],
    }).compile();

    service = module.get<SoulProgressCountService>(SoulProgressCountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
