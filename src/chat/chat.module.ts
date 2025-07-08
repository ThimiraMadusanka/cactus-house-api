import { Module } from '@nestjs/common';
import { ChatController } from './controller/chat.controller';
import { ChatResourceService } from './service/chatResource.service';
import { DatabaseModule } from 'src/database/database.module';
import { ChatResourceProvider } from './providers/chatResource.provider';
import { ConverstionProvider } from './providers/converstion.provider';
import { ConversationService } from './service/conversation.service';
import { OpenAiService } from './service/openAi.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatController],
  providers: [
    ChatResourceService,
    ConversationService,
    OpenAiService,
    ...ChatResourceProvider,
    ...ConverstionProvider,
  ],
})
export class ChatModule {}
