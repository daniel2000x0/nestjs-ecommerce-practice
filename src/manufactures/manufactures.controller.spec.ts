import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturesController } from './manufactures.controller';
import { ManufacturesService } from './manufactures.service';

describe('ManufacturesController', () => {
  let controller: ManufacturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturesController],
      providers: [ManufacturesService],
    }).compile();

    controller = module.get<ManufacturesController>(ManufacturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
