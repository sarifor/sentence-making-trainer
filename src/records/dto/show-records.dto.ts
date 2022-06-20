import { Field, ObjectType } from '@nestjs/graphql';
import { Record } from '../entities/record.entity';

@ObjectType()
export class RecordsOutput {
    @Field(Type => [Record], { nullable: true})
    records?: Record[];
}