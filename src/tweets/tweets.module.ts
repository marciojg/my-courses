import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { CheeckNewTweetsTask } from './cheeck-new-tweets/cheeck-new-tweets.task';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      }),
    }),
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
  controllers: [TweetsController],
  providers: [TweetsService, CheeckNewTweetsTask],
})
export class TweetsModule {}
