import { InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType()
export class UploadRecordDtoInput {
    @Field(type => String, { nullable: false })
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