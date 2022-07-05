import { RecordsService } from './records.service';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Record } from './entities/record.entity';
import { RecordsOutput } from './dto/show-records.dto';
import { UploadRecordDtoInput, UploadRecordDtoOutput } from './dto/upload-record.dto';
import { EditRecordDtoInput, EditRecordDtoOutput } from './dto/edit-record.dto';
import { DeleteRecordDtoOutput } from './dto/delete-record.dto';

@Resolver(of => Record)
export class RecordsResolver {
    constructor(private readonly recordsService: RecordsService) {};

    @Query(returns => RecordsOutput)
    async showAllRecords(): Promise<RecordsOutput> { // No need to put async/await?
        return this.recordsService.showAllRecords();
    };

    @Mutation(returns => UploadRecordDtoOutput)
    async uploadRecord(@Args('record') record: UploadRecordDtoInput): Promise<UploadRecordDtoOutput> {
        return this.recordsService.uploadRecord(record);
    };

    @Mutation(returns => EditRecordDtoOutput)
    async editRecord(@Args('editedRecord') editedRecord: EditRecordDtoInput): Promise<EditRecordDtoOutput> {
        return this.recordsService.editRecord(editedRecord);
    };    

    @Mutation(returns => DeleteRecordDtoOutput)
    async deleteRecord(@Args('index') index: number): Promise<DeleteRecordDtoOutput> {
        return this.recordsService.deleteRecord(index);
    };
};