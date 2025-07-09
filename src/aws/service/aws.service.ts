import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import moment from 'moment';
import { InjectAwsService } from 'nest-aws-sdk';
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
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async fileUpload(fileContent: string, fileName: string, contentType: string) {
    let fileFolder: string;

    if (contentType === JPEG_MIME_TYPE || contentType === PNG_MIME_TYPE) {
      fileFolder = `images/${moment(new Date()).format('YYYY-MM-DD-HH-mm-SS')}_${fileName}`;
    } else if (
      contentType === MP4_MIME_TYPE ||
      contentType === THREE_GP_MIME_TYPE
    ) {
      fileFolder = `videos/${moment(new Date()).format('YYYY-MM-DD-HH-mm-SS')}_${fileName}`;
    } else if (
      contentType === PDF_MIME_TYPE ||
      contentType === WORD_MIME_TYPE ||
      contentType === EXCEL_MIME_TYPE
    ) {
      fileFolder = `documents/${moment(new Date()).format('YYYY-MM-DD-HH-mm-SS')}_${fileName}`;
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileFolder,
      Body: fileContent,
      ContentType: contentType,
    };

    const uploadResult = await this.s3.upload(params).promise();
    return uploadResult.Location;
  }
}
