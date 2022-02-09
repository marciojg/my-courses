import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { CheeckNewTweetsTask } from './cheeck-new-tweets/cheeck-new-tweets.task';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: '6379',
    }),
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
  ],
  controllers: [TweetsController],
  providers: [TweetsService, CheeckNewTweetsTask],
})
export class TweetsModule {}
