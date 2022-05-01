import { Injectable } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { UploadRecordDto } from './dto/upload-record.dto';

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
};

@Injectable()
export class RecordsService implements Plans {
    showAllRecords(): any {
        return { records: records };
    };

    getUploadRecord(): any {
        console.log("getUploadRecord");
    };

    postUploadRecord(record: UploadRecordDto): any {
        records.push({
            translated: "テスト３",
            index: records.length + 1,
            uploaded: new Date(),
            ...record
        });
    };

    getEditRecord(): any {
        console.log("getEditRecord");
    };

    postEditRecord(): any {
        console.log("getPostRecord");
    };    

};