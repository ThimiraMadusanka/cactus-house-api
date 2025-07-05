import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactService {
  async getContacts() {
    return 'Contact';
  }
}
