import { Controller, Get } from '@nestjs/common';
import { ContentService } from '../service/content.service';

@Controller('/v1/content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  async getContents() {
    return await this.contentService.getContents();
  }
}
