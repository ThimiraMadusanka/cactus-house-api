import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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
  async getMessages(@Req() req) {
    const sessionId = req.cookies.session_id;
    return await this.conversationService.getMessages(sessionId);
  }

  @Post('/message')
  async message(
    @Req() req,
    @Res({ passthrough: true }) res,
    @Body() converstionCreateDto: ConverstionCreateDto,
  ) {
    let sessionId = req.cookies.session_id;

    if (!sessionId) {
      sessionId = uuidv4();
      res.cookie('session_id', sessionId, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    const content = await this.chatResourceService.getChatResource(1);

    // save user msg
    await this.conversationService.saveConversation(
      sessionId,
      converstionCreateDto,
      USER,
    );

    // get previous converstions belong to sessionId
    const conversation =
      await this.conversationService.getConversationsForOpenAi(sessionId);

    // get auto reply from openAI
    const reply = await this.openAiService.autoReply(
      conversation,
      content.description,
    );

    // save auto reply
    await this.conversationService.saveConversation(
      sessionId,
      { messageContent: reply },
      ASSISTANT,
    );
  }
}
