import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { ChatResourceCreateDto } from '../dto/chatResourceCreate.dto';
import { ChatResourceUpdateDto } from '../dto/chatResourceUpdate.dto';

@Controller('/v1/chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/resource/:id')
  async getChatResource(@Param('id') id: any) {
    return await this.chatService.getChatResource(id);
  }

  @Post('/resource')
  async createChatResource(
    @Body() chatResourceCreateDto: ChatResourceCreateDto,
  ) {
    return await this.chatService.createChatResource(chatResourceCreateDto);
  }

  @Put('/resource/:id')
  async updateChatResource(
    @Param('id') id: any,
    @Body() chatResourceUpdateDto: ChatResourceUpdateDto,
  ) {
    return await this.chatService.updateChatResource(id, chatResourceUpdateDto);
  }
}
