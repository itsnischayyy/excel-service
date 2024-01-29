// src/excel/excel.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as excelToJson from 'convert-excel-to-json';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { promises as fsPromises } from 'fs';
import { Excel } from './schemas/excel.entity';
import * as xlsx from 'xlsx';
import { UploadCount } from './schemas/upload.entity';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(Excel)
    private readonly excelRepository: Repository<Excel>,
    @InjectRepository(UploadCount)
    private readonly uploadCountRepository: Repository<UploadCount>,
  ) { }

  async processExcel(file): Promise<any> {
    try {
      if (!file || !file.filename) {
        throw new NotFoundException('No File');
      }
      

      const filePath = `./uploads/${file.filename}`;
      const excelData = excelToJson({
        sourceFile: filePath,
        header: {
          rows: 1,
        },
        columnToKey: {
          '*': '{{columnHeader}}',
        },
      });

      const entries = [];

      const defaultValues = {
        name: null,
        parentname: null,
        email: null,
        rollnumber: null,
        school: null,
        mobnum: null,
        address: null
        // ... (Other fields with default values)
      };
      

      // Extracting answers q1 to q20 and adding them to an "answers" array
      for (const entry of excelData.Sheet1) {
        const missingFields = [];



        // Check for missing fields and assign default values
        Object.keys(defaultValues).forEach((field) => {
          if (!entry[field]) {
            entry[field] = defaultValues[field];
            missingFields.push(field);
          }
        });

        if (missingFields.length > 0) {
          entries.push({
            name: entry.name,
            email: entry.email,
            missingFields,
          });
        }

        try {
          const existingRecord = await this.excelRepository.findOne({
            where: { name: entry.name, email: entry.email },
          });

          if (existingRecord) {
            // Update the existing entry with new data
            Object.keys(entry).forEach((field) => {
              if (entry[field] !== null) {
                existingRecord[field] = entry[field];
              }
            });

            existingRecord.updatecount = (existingRecord.updatecount || 0) + 1;

            const updatedExcel = await this.excelRepository.save(existingRecord);
            
            console.log('🚀 ~ ExcelService ~ updatedExcel:', updatedExcel);
          } else {
            // Always create a new entity and save it to the database
            const newExcelEntity = this.excelRepository.create(entry);
            await this.excelRepository.save(newExcelEntity);
            
            console.log('🚀 ~ ExcelService ~ Entry saved to the database:', newExcelEntity);
          }
        } catch (error) {
          // Log the error, but continue processing other entries
          console.error('Error saving entry to the database:', error.message);
        }
      }

      const uploadFolderContents = await fsPromises.readdir('./uploads');
      await this.incrementUploadCount();

      // Delete each file in the uploads folder
      for (const filename of uploadFolderContents) {
        const filePathToDelete = `./uploads/${filename}`;
        await fsPromises.unlink(filePathToDelete);
      }

      if (entries.length > 0) {
        return { status: 201,  message: 'Some entries have missing fields or database errors', entries };
      } else if (excelData.Sheet1.length === 0) {
        return { status: 404, message: 'No data' };
      } else {
        return { status:200, data: excelData.Sheet1 };
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  private async incrementUploadCount(): Promise<void> {
    // Fetch the dedicated UploadCount row from the database
    let uploadCount = await this.uploadCountRepository.findOne({where:{id:1}});
  
    // If no record exists, create a new one with count set to 1
    if (!uploadCount) {
      uploadCount = new UploadCount();
      uploadCount.id = 1; // Assign a specific ID for the dedicated row
      uploadCount.count = 1;
    } else {
      // If a record exists, increment the count
      uploadCount.count += 1;
    }
  
    // Save the updated UploadCount to the database
    await this.uploadCountRepository.save(uploadCount);
  }
}
