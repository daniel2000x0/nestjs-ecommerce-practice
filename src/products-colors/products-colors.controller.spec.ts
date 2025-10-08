import { Test, TestingModule } from '@nestjs/testing';
import { ProductsColorsController } from './products-colors.controller';
import { ProductsColorsService } from './products-colors.service';

describe('ProductsColorsController', () => {
  let controller: ProductsColorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsColorsController],
      providers: [ProductsColorsService],
    }).compile();

    controller = module.get<ProductsColorsController>(ProductsColorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
