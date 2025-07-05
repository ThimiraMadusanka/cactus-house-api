import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ContentController } from './controller/content.controller';
import { ContentService } from './service/content.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
