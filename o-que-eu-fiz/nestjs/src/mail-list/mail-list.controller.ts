import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateMailListDto } from './dto/create-mail-list.dto';
import { MailListService } from './mail-list.service';

@Controller('mail-list')
export class MailListController {
  constructor(private readonly mailListService: MailListService) {}

  @Post()
  create(@Body() createMailListDto: CreateMailListDto) {
    return this.mailListService.create(createMailListDto);
  }

  @Get()
  async findOne(@Res() res) {
    const mail = await this.mailListService.findOne();
    console.log(mail);
    return !mail
      ? res.status(HttpStatus.NO_CONTENT).json(null)
      : res.json(mail);
  }
}
