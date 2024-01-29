// src/pixel/pixel.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixelController } from './pixel.controller';
import { PixelService } from './pixel.service';
import { Pixel } from './schemas/pixel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pixel])],
  controllers: [PixelController],
  providers: [PixelService],
})
export class PixelModule {}
