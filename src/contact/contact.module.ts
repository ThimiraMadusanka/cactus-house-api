import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ContactController } from './controller/contact.controller';
import { ContactService } from './service/contact.service';
import { ContactProvider } from './providers/contact.provider';
import { CONTACT } from 'src/constants/constants';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [ContactService, ...ContactProvider],
  exports: [CONTACT],
})
export class ContactModule {}
