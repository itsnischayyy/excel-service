// src/excel/entities/excel.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Excel {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  parentname: string;

  @Column({ nullable: true })
  rollnumber: string;

  @Column({ nullable: true })
  class: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  school: string;

  @Column({nullable: true })
  mobnum: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  q1: string;

  @Column({ nullable: true })
  q2: string;

  @Column({ nullable: true })
  q3: string;

  @Column({ nullable: true })
  q4: string;

  @Column({ nullable: true })
  q5: string;

  @Column({ nullable: true })
  q6: string;

  @Column({ nullable: true })
  q7: string;

  @Column({ nullable: true })
  q8: string;

  @Column({ nullable: true })
  q9: string;

  @Column({ nullable: true })
  q10: string;

  @Column({ nullable: true })
  q11: string;

  @Column({ nullable: true })
  q12: string;

  @Column({ nullable: true })
  q13: string;

  @Column({ nullable: true })
  q14: string;

  @Column({ nullable: true })
  q15: string;

  @Column({ nullable: true })
  q16: string;

  @Column({ nullable: true })
  q17: string;

  @Column({ nullable: true })
  q18: string;

  @Column({ nullable: true })
  q19: string;

  @Column({ nullable: true })
  q20: string;

  @Column({ default: 0 })
  updatecount: number; // New column to store the update count


  // You can add more columns as needed

  // You may want to add timestamps (created_at, updated_at) columns
  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;
}
