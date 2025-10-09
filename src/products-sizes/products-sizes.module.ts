import { Module } from '@nestjs/common';
import { ProductsSizesService } from './products-sizes.service';
import { ProductsSizesController } from './products-sizes.controller';
import { Size } from 'src/sizes/entities/size.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  controllers: [ProductsSizesController],
  providers: [ProductsSizesService],
})
export class ProductsSizesModule {}
