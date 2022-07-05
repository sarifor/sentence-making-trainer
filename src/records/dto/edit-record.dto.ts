import { InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType()
export class EditRecordDtoInput {
    @Field({ nullable: false })
    index: number;

    @Field(type => String, { nullable: true })
    sentence: string;

    @Field(type => String, { nullable: true })
    source: string;

    @Field(type => String, { nullable: true })
    translated: string;
}

@ObjectType()
export class EditRecordDtoOutput {
    @Field(type => String, { nullable: true })
    error?: string;

    @Field(type => Boolean)
    ok: boolean;
}