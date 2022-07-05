import { Controller, Get, Render, Param, Redirect, Post, Body } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Resolver, Query, ResolveField, Args, Mutation } from '@nestjs/graphql';
import { Record } from './entities/record.entity';
import { RecordsOutput } from './dto/show-records.dto';
import { UploadRecordDtoInput, UploadRecordDtoOutput } from './dto/upload-record.dto';

@Resolver(of => Record)
@Controller('records')
export class RecordsController {
    constructor(private readonly recordsService: RecordsService) {};

    @Query(returns => RecordsOutput)
    @Get()
    @Render('home')
    showAllRecords(): Promise<RecordsOutput> { // No need to put async/await?
        return this.recordsService.showAllRecords();
    };

    @Get('/upload')
    @Render('upload')
    getUploadRecord(): any {
        return this.recordsService.getUploadRecord();
    };

    @Mutation(returns => UploadRecordDtoOutput)
    @Post('/upload')
    @Redirect('/records')
    async postUploadRecord(@Args('record') record: UploadRecordDtoInput): Promise<UploadRecordDtoOutput> {
        return this.recordsService.postUploadRecord(record);
    };    

    /* @Get('/:index/edit')
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
    }; */
};