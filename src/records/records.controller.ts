import { Controller, Get, Render, Param, Redirect, Post, Body } from '@nestjs/common';
import { RecordsService } from './records.service';
import { UploadRecordDto } from './dto/upload-record.dto';
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
    getUploadRecord(): any {
        return this.recordsService.getUploadRecord();
    };

    @Post('/upload')
    @Redirect('/records')
    postUploadRecord(@Body() record: UploadRecordDto): any {
        return this.recordsService.postUploadRecord(record);
    };    

    @Get('/:index/edit')
    @Render('edit')
    getEditRecord(@Param('index') index: number): any {
        return this.recordsService.getEditRecord(index);
    };

    @Post('/:index/edit')
    @Redirect('/records')
    postEditRecord(): any {
        return this.recordsService.postEditRecord();
    };    

};