import { Injectable } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { RecordsOutput } from './dto/show-records.dto';
import { UploadRecordDtoInput, UploadRecordDtoOutput } from './dto/upload-record.dto';
import axios from "axios";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface Plans {
    showAllRecords(): any;
    getUploadRecord(): any;
    postUploadRecord(record: UploadRecordDtoInput): any;
    // getEditRecord(index: number): any;
    // postEditRecord(index: number, record: UpdateRecordDto): any;
    // getDeleteRecord(index: number): any;
};

@Injectable()
export class RecordsService implements Plans {
    constructor(
        @InjectRepository(Record)
        private recordsRepository: Repository<Record>,
    ) {}

    async showAllRecords(): Promise<RecordsOutput> {
        const records = await this.recordsRepository.find();
        return { records: records };
    };

    getUploadRecord(): any {
        console.log("getUploadRecord");
    };

    async postUploadRecord(record: UploadRecordDtoInput): Promise<UploadRecordDtoOutput> {
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
            console.log(e);
        };
    };

    /* async getEditRecord(index: number): Promise<any> {
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
    }

    async postEditRecord(index: number, record: UpdateRecordDto): Promise<any> {
        await this.recordsRepository.update({ index: index }, record); 
    };

    async getDeleteRecord(index: number) {
        try {
            await this.recordsRepository.delete({
                index: index,
            });
        } catch(e) {
            console.log("No Data Deleted");
        }
    }; */
};