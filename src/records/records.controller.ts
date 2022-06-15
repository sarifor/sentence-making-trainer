import { Controller, Get, Render, Param, Redirect, Post, Body } from '@nestjs/common';
import { RecordsService } from './records.service';
import { UploadRecordDto } from './dto/upload-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Resolver, Query, ResolveField, Args } from '@nestjs/graphql';
import { Record } from './entities/record.entity';

@Resolver(of => Record)
@Controller('records')
export class RecordsController {
    constructor(private readonly recordsService: RecordsService) {};

    @Query(returns => Record)
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
    postEditRecord(@Param('index') index: number, @Body() record: UpdateRecordDto): any {
        return this.recordsService.postEditRecord(index, record);
    };    

    @Get('/:index/delete')
    @Redirect('/records')
    getDeleteRecord(@Param('index') index: number): any {
        return this.recordsService.getDeleteRecord(index);
    };
};