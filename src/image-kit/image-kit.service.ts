import { Inject, Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';

@Injectable()
export class ImageKitService {
  constructor(
    @Inject('IMAGEKIT_INSTANCE') private readonly imageKit: ImageKit,
  ) {}

  async getImage(id: string): Promise<any> {
    const image = await this.imageKit.getFileDetails(id);
    return image;
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    const { fileId, url } = await this.imageKit.upload({
      file: file.buffer.toString('base64'),
      fileName: `${Date.now()}-${file.originalname}`,
    });
    return { fileId, url };
  }

  async uploadImages(files: Express.Multer.File[]): Promise<any[]> {
    try {
      const uploadResults = await Promise.all(
        files.map(async (file) => {
          const { fileId, url } = await this.imageKit.upload({
            file: file.buffer.toString('base64'),
            fileName: `${Date.now()}-${file.originalname}`,
          });
          return { fileId, url };
        }),
      );

      // Return an array of upload results
      return uploadResults;
    } catch (error) {
      console.error('Error uploading files to ImageKit:', error.message);
      throw new Error('Failed to upload images');
    }
  }

  async deleteImage(id: string): Promise<any> {
    const deletedImage = await this.imageKit.deleteFile(id);
    return deletedImage;
  }
}
