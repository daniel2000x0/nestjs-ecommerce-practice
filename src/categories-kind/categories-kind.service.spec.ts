import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesKindService } from './categories-kind.service';

describe('CategoriesKindService', () => {
  let service: CategoriesKindService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesKindService],
    }).compile();

    service = module.get<CategoriesKindService>(CategoriesKindService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
