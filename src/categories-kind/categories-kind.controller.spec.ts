import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesKindController } from './categories-kind.controller';
import { CategoriesKindService } from './categories-kind.service';

describe('CategoriesKindController', () => {
  let controller: CategoriesKindController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesKindController],
      providers: [CategoriesKindService],
    }).compile();

    controller = module.get<CategoriesKindController>(CategoriesKindController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
