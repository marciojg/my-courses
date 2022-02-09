import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailListDto } from './dto/create-mail-list.dto';
import { MailList, MailListDocument } from './schemas/mail-list.schema';

@Injectable()
export class MailListService {
  constructor(
    @InjectModel(MailList.name)
    private mailListModel: Model<MailListDocument>,
  ) {}

  async create({ emails }: CreateMailListDto) {
    const mail = await this.findOne();

    if (!mail) {
      return this.mailListModel.create({ emails });
    }

    await mail.update({ emails });
    return mail;
  }

  async findOne() {
    const mails = await this.mailListModel.find().exec();
    return mails.length ? mails[0] : null;
  }
}
