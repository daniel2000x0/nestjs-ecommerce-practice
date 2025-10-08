import { Module } from '@nestjs/common';
import { ManufacturesService } from './manufactures.service';
import { ManufacturesController } from './manufactures.controller';

@Module({
  controllers: [ManufacturesController],
  providers: [ManufacturesService],
})
export class ManufacturesModule {}
