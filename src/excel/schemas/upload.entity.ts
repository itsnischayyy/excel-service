// src/excel/entities/upload-count.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UploadCount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  count: number;
}
