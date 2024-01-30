import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pixel } from './schemas/pixel.entity'; // Corrected import path

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
      const now = new Date();
      user.timestamp = `${now.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' })} ${now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false })}.${now.getMilliseconds()}`;
      await this.pixelRepository.save(user);
    }
  }
  
  async createUser(name: string, email: string, ipAddress: any, userAgent: any): Promise<void> {
    const now = new Date();
    const user = this.pixelRepository.create({
      name,
      email,
      ipAddress,
      userAgent,
      timestamp: `${now.toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' })} ${now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false })}.${now.getMilliseconds()}`,
    });
    await this.pixelRepository.save(user);
  }

  async getAllPixels(): Promise<Pixel[]> {
    return await this.pixelRepository.find();
  }
}