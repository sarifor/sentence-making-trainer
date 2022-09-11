import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordsModule } from './records/records.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './records/entities/record.entity';
// import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RecordsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PW,
      database: process.env.DB_DBNAME,
      entities: [Record],
      synchronize: true, // shouldn't be used in production,
      ssl: {
        rejectUnauthorized: false
      }
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({ // Playground: http://localhost:4000/graphql
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: 'http://localhost:3000',
        credential: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
