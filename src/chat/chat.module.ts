import { Module } from '@nestjs/common';
import { ChatController } from './controller/chat.controller';
import { ChatService } from './service/chat.service';
import { DatabaseModule } from 'src/database/database.module';
import { ChatResourceProvider } from './providers/chatResource.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatController],
  providers: [ChatService, ...ChatResourceProvider],
})
export class ChatModule {}
