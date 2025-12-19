import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule, // ✅ OBLIGATORIO
  ],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
