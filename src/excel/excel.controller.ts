  // src/excel/excel.controller.ts
  import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { ExcelService } from './excel.service';

  @Controller('excel')
  export class ExcelController {
    constructor(private readonly excelService: ExcelService
      ) { }

    @Post('/read')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file) {
      try {
        if (!file || !file.originalname.match(/\.(xlsx|csv)$/)) {
          throw new BadRequestException('Invalid or unsupported file format. Please provide a valid Excel or CSV file.');
        }

        // const fileBuffer = file.buffer; // Extract the buffer from the file object

        const result = await this.excelService.processFile(file);
        if (result.status === 200) {
          return { status: 200, data: result };
        } else if (result.status === 201) {
          return { status: 201, data: result };
        }

      } catch (error) {
        return { status: 500, error: error.message };
      }
    }
  }
