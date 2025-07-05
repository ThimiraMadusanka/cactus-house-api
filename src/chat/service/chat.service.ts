import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async getChats() {
    return 'Chats';
  }
}
