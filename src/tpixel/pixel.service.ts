// src/pixel/pixel.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pixel } from './schemas/pixel.entity';

@Injectable()
export class PixelService {
  constructor(
    @InjectRepository(Pixel)
    private readonly pixelRepository: Repository<Pixel>,
  ) {}

  async findUserByNameAndEmail(name: string, email: string): Promise<Pixel | undefined> {
    return this.pixelRepository.findOne({ where: { name, email } });
  }

  async updateUserTimestamp(id: number): Promise<void> {
    const user = await this.pixelRepository.findOne({ where: { id } });
    if (user) {
      user.timestamp = new Date();
      await this.pixelRepository.save(user);
    }
  }
  
  async createUser(name: string, email: string, ipAddress: any, userAgent: any): Promise<void> {
    const user = this.pixelRepository.create({
      name,
      email,
      ipAddress,
      userAgent,
    });
    await this.pixelRepository.save(user);
  }
  

  async getAllPixels(): Promise<Pixel[]> {
    return await this.pixelRepository.find();
  }
}
