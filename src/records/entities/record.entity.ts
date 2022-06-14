import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    index: number;

    @Column()
    sentence: string;

    @Column()
    translated: string;

    @Column()
    source: string;

    @Column()
    uploaded: Date;
};