import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CHAT_RESOURCE } from 'src/constants/constants';
import { ChatResourceModel } from '../entities/chatResource.entity';
import { ChatResourceCreateDto } from '../dto/chatResourceCreate.dto';
import { ChatResourceUpdateDto } from '../dto/chatResourceUpdate.dto';

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

  async createChatResource(chatResourceCreateDto: ChatResourceCreateDto) {
    const { description, images } = chatResourceCreateDto;

    const chatResource = await this.ChatResource.create({
      description: description,
      images: images,
    });

    return chatResource.toJSON();
  }

  async updateChatResource(
    id: any,
    chatResourceUpdateDto: ChatResourceUpdateDto,
  ) {
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

    const { description, images } = chatResourceUpdateDto;

    await this.ChatResource.update(
      {
        description: description,
        images: images,
        updatedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      },
    );

    throw new HttpException(
      `Chat Resource updated with id ${id}`,
      HttpStatus.OK,
    );
  }
}
