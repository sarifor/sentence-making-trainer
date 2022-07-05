import { Field, ObjectType, InputType } from '@nestjs/graphql';

@InputType()
export class UploadRecordDtoInput {
    @Field(type => String)
    sentence: string;

    @Field(type => String)
    source: string;
}

@ObjectType()
export class UploadRecordDtoOutput {
    @Field(type => String, { nullable: true })
    error?: string;

    @Field(type => Boolean)
    ok: boolean;
}