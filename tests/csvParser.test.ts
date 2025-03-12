import { parseCsv } from '../src/csvParser';
import { Readable } from 'stream';

describe('CSV Parser', () => {
    it('parses CSV data correctly', async () => {
        const csvData = `BNEJWQZM,Thomas,Thierry,2014/04/27,Suspendu
CODE2,John,Doe,2020/01/01,Active`;
        const stream = Readable.from([csvData]);
        const records = await parseCsv(stream);
        expect(records).toEqual([
            ['BNEJWQZM', 'Thomas', 'Thierry', '2014/04/27', 'Suspendu'],
            ['CODE2', 'John', 'Doe', '2020/01/01', 'Active']
        ]);
    });
});
