import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ChatResourceService } from '../service/chatResource.service';
import { ConversationService } from '../service/conversation.service';
import { ChatResourceCreateOrUpdateDto } from '../dto/chatResourceCreateOrUpdate.dto';
import { ConverstionCreateDto } from '../dto/conversationCreate.dto';
import { OpenAiService } from '../service/openAi.service';
import { ASSISTANT, USER } from 'src/constants/constants';
import { Auth } from 'src/authentication/decorator/auth.decorator';

@Controller('/v1/chat')
export class ChatController {
  constructor(
    private chatResourceService: ChatResourceService,
    private conversationService: ConversationService,
    private openAiService: OpenAiService,
  ) {}

  @Get('/resource/:id')
  @Auth('ADMIN')
  async getChatResource(@Param('id') id: any) {
    return await this.chatResourceService.getChatResource(id);
  }

  @Put('/resource/:id')
  @Auth('ADMIN')
  async createOrUpdateChatResource(
    @Param('id') id: any,
    @Body() chatResourceCreateOrUpdateDto: ChatResourceCreateOrUpdateDto,
  ) {
    return await this.chatResourceService.createOrUpdateChatResource(
      id,
      chatResourceCreateOrUpdateDto,
    );
  }

  @Get('/messages')
  async getMessages(@Query('session_id') session_id: string) {
    return await this.conversationService.getMessages(session_id);
  }

  @Post('/message')
  async message(
    @Query('session_id') session_id: string,
    @Body() converstionCreateDto: ConverstionCreateDto,
  ) {
    const content = await this.chatResourceService.getChatResource(1);

    // save user msg
    await this.conversationService.saveConversation(
      session_id,
      converstionCreateDto,
      USER,
    );

    // get previous converstions belong to session_id
    const conversation =
      await this.conversationService.getConversationsForOpenAi(session_id);

    // get auto reply from openAI
    const reply = await this.openAiService.autoReply(
      conversation,
      content.description,
    );

    // save auto reply
    await this.conversationService.saveConversation(
      session_id,
      { messageContent: reply },
      ASSISTANT,
    );
  }
}
