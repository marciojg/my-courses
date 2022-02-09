import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailListController } from './mail-list.controller';
import { MailListService } from './mail-list.service';
import { MailList, MailListSchema } from './schemas/mail-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MailList.name, schema: MailListSchema },
    ]),
  ],
  controllers: [MailListController],
  providers: [MailListService],
})
export class MailListModule {}
