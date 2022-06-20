import { ObjectType, InputType } from '@nestjs/graphql';
import { Record } from '../entities/record.entity';

@InputType()
export class UploadRecordDto extends Record {
};