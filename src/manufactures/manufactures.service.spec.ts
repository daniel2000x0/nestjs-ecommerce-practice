import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturesService } from './manufactures.service';

describe('ManufacturesService', () => {
  let service: ManufacturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManufacturesService],
    }).compile();

    service = module.get<ManufacturesService>(ManufacturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
