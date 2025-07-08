import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { ContactCreateDto } from '../dto/contactCreate.dto';

@Controller('/v1/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  async getContacts(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('status') status?: string,
  ) {
    return await this.contactService.getContacts(page, size, status);
  }

  @Get('/:id')
  async getContactById(@Param('id') id: any) {
    return await this.contactService.getContactById(id);
  }

  @Post()
  @HttpCode(201)
  async createContact(@Body() contactCreateDto: ContactCreateDto) {
    return await this.contactService.createContact(contactCreateDto);
  }

  @Patch('/:id')
  async contactStatusChange(
    @Param('id') id: any,
    @Query('status') status: string,
  ) {
    return await this.contactService.contactStatusChange(id, status);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteContact(@Param('id') id: any) {
    return await this.contactService.deleteContact(id);
  }
}
