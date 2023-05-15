import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrimsaModule } from './primsa/primsa.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrimsaModule],
})
export class AppModule {}
