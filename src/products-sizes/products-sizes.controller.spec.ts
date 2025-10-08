import { Test, TestingModule } from '@nestjs/testing';
import { ProductsSizesController } from './products-sizes.controller';
import { ProductsSizesService } from './products-sizes.service';

describe('ProductsSizesController', () => {
  let controller: ProductsSizesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsSizesController],
      providers: [ProductsSizesService],
    }).compile();

    controller = module.get<ProductsSizesController>(ProductsSizesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
