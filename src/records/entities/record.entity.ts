import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Record {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    index: number;

    @Field({ nullable: false })
    @Column()
    sentence: string;

    @Field({ nullable: false })
    @Column()
    translated: string;

    @Field(type => String)
    @Column()
    source: string;

    @Field(type => Date)    
    @Column()
    uploaded: Date;
};