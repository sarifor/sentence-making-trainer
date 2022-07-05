import { Controller, Get, Render, Redirect, Post, Param } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Record } from './entities/record.entity';
import { RecordsOutput } from './dto/show-records.dto';
import { UploadRecordDtoInput, UploadRecordDtoOutput } from './dto/upload-record.dto';
import { EditRecordDtoInput, EditRecordDtoOutput } from './dto/edit-record.dto';
import { DeleteRecordDtoOutput } from './dto/delete-record.dto';

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

    @Get('/:index/edit')
    @Render('edit')
    getEditRecord(@Param('index') index: number): any {
        return this.recordsService.getEditRecord(index);
    };

    @Mutation(returns => EditRecordDtoOutput)
    @Post('/:index/edit')
    @Redirect('/records')
    postEditRecord(@Args('editedRecord') editedRecord: EditRecordDtoInput): Promise<EditRecordDtoOutput> {
        return this.recordsService.postEditRecord(editedRecord);
    };    

    @Mutation(returns => DeleteRecordDtoOutput)
    @Get('/:index/delete')
    @Redirect('/records')
    getDeleteRecord(@Args('index') index: number): Promise<DeleteRecordDtoOutput> {
        return this.recordsService.getDeleteRecord(index);
    };
};