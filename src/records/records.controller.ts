import { Controller, Get, Render, Param, Redirect, Post, Body } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './entities/record.entity';

@Controller('records')
export class RecordsController {
    constructor(private readonly recordsService: RecordsService) {};

    @Get()
    @Render('home')
    showAllRecords(): any {
        return this.recordsService.showAllRecords();
    };

    @Get('/upload')
    @Render('upload')
    uploadRecord(): any {
        return this.recordsService.uploadRecord();
    };

    @Post('/upload')
    @Redirect('/records') // localhost:4000/records // somtimes not redirected
    UploadRecordPost(): any { // will change method name 
        return this.recordsService.uploadRecordPost();
    };    
};