import { Controller, Get } from '@nestjs/common';
import { ContactService } from '../service/contact.service';

@Controller('/v1/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  async getContacts() {
    return await this.contactService.getContacts();
  }
}
