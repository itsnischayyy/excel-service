// src/excel/excel.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Excel } from './schemas/excel.entity';
import { UploadCount } from './schemas/upload.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([Excel, UploadCount]), // Import the TypeORM entity
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'root',
    //   database: 'postgres',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    // MongooseModule.forFeature([{ name: Excel.name, schema: ExcelSchema }]),
    // MongooseModule.forRoot('mongodb://localhost:27017/email'),
  ],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
