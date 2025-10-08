import { Test, TestingModule } from '@nestjs/testing';
import { ProductsColorsService } from './products-colors.service';

describe('ProductsColorsService', () => {
  let service: ProductsColorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsColorsService],
    }).compile();

    service = module.get<ProductsColorsService>(ProductsColorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
