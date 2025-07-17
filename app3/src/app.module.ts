import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export const typeOrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
    host: 'localhost',
    port: 52397,
    username: 'root',
    password: 'Burchan1151',
    database: 'nestjs_db',
    synchronize: false,
    connectTimeout: 10000,
    logger: 'simple-console',
    poolSize: 20,
    charset: 'utf8mb4',
    supportBigNumbers: true,
    entities: [__dirname + '/**/*.entity*{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*.ts'],
    logging: true
}

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, PostModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

export default new DataSource(typeOrmConfig)
