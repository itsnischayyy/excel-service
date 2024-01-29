// src/pixel/pixel.controller.ts
import { Controller, Get, Query, Res } from '@nestjs/common';
import { PixelService } from './pixel.service';

@Controller('pixel')
export class PixelController {
  constructor(private readonly pixelService: PixelService) {}

  @Get('/tracking-pixel')
  async trackingPixel(
    @Query('name') name: string,
    @Query('email') email: string,
    @Res() res,
  ): Promise<void> {
    const existingUser = await this.pixelService.findUserByNameAndEmail(name, email);

    if (existingUser) {
      await this.pixelService.updateUserTimestamp(existingUser.id);
    } else {
      const ipAddress = res.req.ip; // Use req.ip from the response object
      const userAgent = res.req.get('User-Agent'); // Use req.get('User-Agent') from the response object

      await this.pixelService.createUser(name, email, ipAddress, userAgent);
    }

    // Send 1x1 transparent pixel
    const pixelImage = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/6r+RwAAAABJRU5ErkJggg==',
      'base64',
    );
    res.header('Content-Type', 'image/png').send(pixelImage);
  }

  @Get('/info')
  async getAllPixels(): Promise<any> {
    return await this.pixelService.getAllPixels();
  }
}
