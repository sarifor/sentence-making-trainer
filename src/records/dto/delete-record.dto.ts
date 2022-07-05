import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteRecordDtoOutput {
    @Field(type => String, { nullable: true })
    error?: string;

    @Field(type => Boolean)
    ok: boolean;
}