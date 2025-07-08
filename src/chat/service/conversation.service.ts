import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CONVERSATION } from 'src/constants/constants';
import { ConversationModel } from '../entities/conversation.entity';
import { ConverstionCreateDto } from '../dto/conversationCreate.dto';

@Injectable()
export class ConversationService {
  constructor(
    @Inject(CONVERSATION)
    private Conversation: typeof ConversationModel,
  ) {}

  async getMessages(sessionId: string) {
    if (!sessionId) {
      throw new HttpException('No session found', HttpStatus.NOT_FOUND);
    }

    const conversations = await this.Conversation.findAll({
      where: {
        sessionId: sessionId,
      },
      raw: true,
    });

    return conversations;
  }

  async saveConversation(
    sessionId: string,
    converstionCreateDto: ConverstionCreateDto,
    role: string,
  ) {
    const { messageContent } = converstionCreateDto;

    const conversation = await this.Conversation.create({
      sessionId: sessionId,
      messageContent: messageContent,
      role: role,
    });

    return conversation.toJSON();
  }

  async getConversationsForOpenAi(sessionId: string) {
    const conversations = await this.Conversation.findAll({
      attributes: ['role', ['message_content', 'content']],
      where: {
        sessionId: sessionId,
      },
      raw: true,
    });

    const updatedConversations = conversations.map((c) => ({
      ...c,
      role: c.role.toLowerCase(),
    }));

    return updatedConversations;
  }
}
