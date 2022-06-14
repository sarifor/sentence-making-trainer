import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './records/entities/record.entity';
// import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RecordsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PW,
      database: process.env.DB_DBNAME,
      entities: [Record],
      synchronize: true, // shouldn't be used in production
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
