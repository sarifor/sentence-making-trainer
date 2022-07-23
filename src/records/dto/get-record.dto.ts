import { Field, ObjectType } from '@nestjs/graphql';
import { Record } from '../entities/record.entity';

@ObjectType()
export class GetRecordDtoOutput {
    @Field(Type => Record, { nullable: true})
    record?: Record;
}