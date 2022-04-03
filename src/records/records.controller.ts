import { Controller, Get, Render, Param, Redirect, Post, Body } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './entities/record.entity';

@Controller('records')
export class RecordsController {
    constructor(private readonly recordsService: RecordsService) {};

    @Get()
    @Render('home')
    showAllRecords(): Record[] {
        const records: Record[] = [ // for test
            {
                sentence: "test1",
                translated: "테스트1",
                source: "https://yahoo.co.jp",
                uploaded: new Date(),
            },            
        ]
        return records;
        // return this.recordsService.showAllRecords();
    };
};