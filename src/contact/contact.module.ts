import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ContactController } from './controller/contact.controller';
import { ContactService } from './service/contact.service';
import { ContactProvider } from './providers/contact.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [ContactService, ...ContactProvider],
})
export class ContactModule {}
