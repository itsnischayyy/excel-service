// src/app.module.ts
import { Module } from '@nestjs/common';
import { ExcelModule } from './excel/excel.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixelModule } from './tpixel/pixel.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:'.env', isGlobal: true}),
    ExcelModule,
    EmailModule,
    PixelModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DATABASE_HOST,
    //   port: parseInt(process.env.DATABASE_PORT, 10),
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD || 'default_password',
    //   database: process.env.DATABASE_NAME,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: Boolean(process.env.DATABASE_SYNC),

    //   // type: 'postgres',
    //   // host: 'localhost',
    //   // port: 5432,
    //   // username: 'postgres',
    //   // password: 'root',
    //   // database: 'postgres',
    //   // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   // synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, 
      synchronize: Boolean(process.env.DATABASE_SYNC),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
