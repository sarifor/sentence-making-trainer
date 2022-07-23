import { Injectable } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { RecordsOutput } from './dto/show-records.dto';
import { UploadRecordDtoInput, UploadRecordDtoOutput } from './dto/upload-record.dto';
import axios from "axios";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditRecordDtoInput, EditRecordDtoOutput } from './dto/edit-record.dto';
import { DeleteRecordDtoOutput } from './dto/delete-record.dto';

interface Plans {
    showAllRecords(): Promise<RecordsOutput>;
    uploadRecord(record: UploadRecordDtoInput): Promise<UploadRecordDtoOutput>;
    editRecord(editedRecord: EditRecordDtoInput): Promise<EditRecordDtoOutput>;
    deleteRecord(index: number): Promise<DeleteRecordDtoOutput>;
};

@Injectable()
export class RecordsService implements Plans {
    constructor(
        @InjectRepository(Record)
        private recordsRepository: Repository<Record>,
    ) {}

    async showAllRecords(): Promise<RecordsOutput> {
        try {
            const records = await this.recordsRepository.find();
            return { records: records };
        } catch (e) {
            console.log("No Data Found"); // would be better to use { ok: false, error: "No Data Found" } like other functions
        }
    };

    async uploadRecord(record: UploadRecordDtoInput): Promise<UploadRecordDtoOutput> {
        // Papago API로, record.sentence(영어)를 한국어로 번역
        const api_url = "https://openapi.naver.com/v1/papago/n2mt";
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;
        const query = record.sentence;

        try {
            const lengthOfRepo: number = await this.recordsRepository.count({});

            const { data } = await axios.post(
                api_url,
                { source: "en", target: "ja", text: query },
                { headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret, } }
            );

            const translated = data.message.result.translatedText;

            const newRecord = {
                index: lengthOfRepo + 1,
                sentence: record.sentence,
                translated: translated,
                source: record.source,
                uploaded: new Date(),                
            }


            await this.recordsRepository.insert(newRecord);

            return {
                ok: true
            };

        } catch (e) {
            return {
                ok: false,
                error: "Can not be uploaded",
            }
        };
    };

    async getRecord(index: number): Promise<any> {
        try {
            const record: Record = await this.recordsRepository.findOne({
                where: {
                    index: index,
                },
            });
            return { record: record };
        } catch(e) {
            console.log("No Data Found");
        }
    };

    async editRecord(editedRecord: EditRecordDtoInput): Promise<EditRecordDtoOutput> {
        try {
            await this.recordsRepository.update({ index: editedRecord.index }, editedRecord); 
            return {
                ok: true
            }
        } catch (e) {
            return {
                ok: false,
                error: "No Data Found",
            }
        }

    };

    async deleteRecord(index: number): Promise<DeleteRecordDtoOutput> {
        try {
            await this.recordsRepository.delete({
                index: index,
            });

            return {
                ok: true
            }
        } catch(e) {
            return {
                ok: false,
                error: "No Data Found",
            }
        }
    };
};