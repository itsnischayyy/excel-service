// src/pixel/pixel.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pixel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  ipAddress: string;

  @Column()
  userAgent: string;

  @Column()
  timestamp: string;
}
