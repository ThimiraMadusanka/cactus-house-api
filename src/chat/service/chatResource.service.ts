import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CHAT_RESOURCE } from 'src/constants/constants';
import { ChatResourceModel } from '../entities/chatResource.entity';
import { ChatResourceCreateOrUpdateDto } from '../dto/chatResourceCreateOrUpdate.dto';

@Injectable()
export class ChatResourceService {
  constructor(
    @Inject(CHAT_RESOURCE)
    private ChatResource: typeof ChatResourceModel,
  ) {}

  async getChatResource(id: any) {
    const chatResource = await this.ChatResource.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!chatResource) {
      throw new HttpException(
        `Chat Resource not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return chatResource;
  }

  async createOrUpdateChatResource(
    id: any,
    chatResourceCreateOrUpdateDto: ChatResourceCreateOrUpdateDto,
  ) {
    const { description } = chatResourceCreateOrUpdateDto;

    await this.ChatResource.upsert(
      {
        id: id,
        description: description,
        updatedAt: new Date(),
      },
      {
        returning: true,
      },
    );

    throw new HttpException(
      `Chat Resource updated with id ${id}`,
      HttpStatus.OK,
    );
  }
}
