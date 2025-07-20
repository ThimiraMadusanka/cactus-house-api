import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  EXCEL_MIME_TYPE,
  JPEG_MIME_TYPE,
  MP4_MIME_TYPE,
  PDF_MIME_TYPE,
  PNG_MIME_TYPE,
  THREE_GP_MIME_TYPE,
  WORD_MIME_TYPE,
} from 'src/constants/constants';

@Injectable()
export class AWSService {
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async fileUpload(fileContent: string, fileName: string, contentType: string) {
    try {
      let fileFolder: string;

      if (contentType === JPEG_MIME_TYPE || contentType === PNG_MIME_TYPE) {
        fileFolder = `images/${moment().format('YYYY-MM-DD-HH-mm-ss')}_${fileName}`;
      } else if (
        contentType === MP4_MIME_TYPE ||
        contentType === THREE_GP_MIME_TYPE
      ) {
        fileFolder = `videos/${moment().format('YYYY-MM-DD-HH-mm-ss')}_${fileName}`;
      } else if (
        contentType === PDF_MIME_TYPE ||
        contentType === WORD_MIME_TYPE ||
        contentType === EXCEL_MIME_TYPE
      ) {
        fileFolder = `documents/${moment().format('YYYY-MM-DD-HH-mm-ss')}_${fileName}`;
      } else {
        fileFolder = `others/${moment().format('YYYY-MM-DD-HH-mm-ss')}_${fileName}`;
      }

      const buffer = Buffer.from(fileContent, 'base64');

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileFolder,
        Body: buffer,
        ContentType: contentType,
      };

      const command = new PutObjectCommand(params);

      await this.s3.send(command);

      const location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileFolder}`;

      return location;
    } catch (error) {
      console.log('Error: ', error);
      throw new HttpException('Aws file upload error', HttpStatus.BAD_REQUEST);
    }
  }
}
