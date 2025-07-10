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
import { Auth } from 'src/authentication/decorator/auth.decorator';

@Controller('/v1/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  @Auth('ADMIN')
  async getContacts(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('status') status?: string,
  ) {
    return await this.contactService.getContacts(page, size, status);
  }

  @Get('/:id')
  @Auth('ADMIN')
  async getContactById(@Param('id') id: any) {
    return await this.contactService.getContactById(id);
  }

  @Post()
  @HttpCode(201)
  async createContact(@Body() contactCreateDto: ContactCreateDto) {
    return await this.contactService.createContact(contactCreateDto);
  }

  @Patch('/:id')
  @Auth('ADMIN')
  async contactStatusChange(
    @Param('id') id: any,
    @Query('status') status: string,
  ) {
    return await this.contactService.contactStatusChange(id, status);
  }

  @Delete('/:id')
  @Auth('ADMIN')
  @HttpCode(204)
  async deleteContact(@Param('id') id: any) {
    return await this.contactService.deleteContact(id);
  }
}
