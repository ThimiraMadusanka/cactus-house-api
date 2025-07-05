import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ContactController } from './controller/contact.controller';
import { ContactService } from './service/contact.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
