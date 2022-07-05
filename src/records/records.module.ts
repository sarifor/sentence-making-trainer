import { Module } from '@nestjs/common';
import { RecordsResolver } from './records.resolver';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Record])],
    providers: [RecordsResolver, RecordsService],
})
export class RecordsModule {};