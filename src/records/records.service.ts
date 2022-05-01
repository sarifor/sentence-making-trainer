import { Injectable } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { UploadRecordDto } from './dto/upload-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import axios from "axios";

let records: Record[] = [
    {
        index: 1,
        sentence: "test1",
        translated: "테스트1",
        source: "https://yahoo.co.jp",
        uploaded: new Date(),
    },
    {
        index: 2,
        sentence: "test2",
        translated: "테스트2",
        source: "https://yahoo.co.uk",
        uploaded: new Date(),
    },    
];

interface Plans {
    showAllRecords(): any;
    getUploadRecord(): any;
    postUploadRecord(record: UploadRecordDto): any;
    getEditRecord(index: number): any;
    postEditRecord(index: number, record: UpdateRecordDto): any;
    getDeleteRecord(index: number): any;
};

@Injectable()
export class RecordsService implements Plans {
    showAllRecords(): any {
        return { records: records };
    };

    getUploadRecord(): any {
        console.log("getUploadRecord");
    };

    async postUploadRecord(record: UploadRecordDto) {
        // Papago API로, record.sentence(영어)를 한국어로 번역
        const api_url = "https://openapi.naver.com/v1/papago/n2mt";
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;
        const query = record.sentence;

        try {
            const { data } = await axios.post(
                api_url,
                { source: "en", target: "ko", text: query },
                { headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret, } }
            );
            const translated = data.message.result.translatedText;

            records.push({
                translated,
                index: records.length + 1,
                uploaded: new Date(),
                ...record
            });            
        } catch (e) {
            console.log(e);
        };
    };

    getEditRecord(index: number): any {
        const record: Record = records.find(item => item.index == index);
        console.log(record);
        return { record: record };
    };

    postEditRecord(index: number, record: UpdateRecordDto): any {
        const originalRecord: Record = records.find(item => item.index == index);
        const otherRecords: Record[] = records.filter(item => item.index != index);
        
        records = otherRecords; // 이 부분 때문에 const records라고 선언할 수 없는 것. 변수값 재할당은 let, var만 가능
        records.push({ ...originalRecord, ...record});
    };

    getDeleteRecord(index: number) {
        const otherRecords: Record[] = records.filter(item => item.index != index);
        
        records = otherRecords;
    };
};