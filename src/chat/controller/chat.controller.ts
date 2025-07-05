import { Controller, Get } from '@nestjs/common';
import { ChatService } from '../service/chat.service';

@Controller('/v1/chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  async getChats() {
    return await this.chatService.getChats();
  }
}
