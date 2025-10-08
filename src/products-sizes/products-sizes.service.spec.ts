import { Test, TestingModule } from '@nestjs/testing';
import { ProductsSizesService } from './products-sizes.service';

describe('ProductsSizesService', () => {
  let service: ProductsSizesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsSizesService],
    }).compile();

    service = module.get<ProductsSizesService>(ProductsSizesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
