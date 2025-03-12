import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { streamXlsxRows } from '../src/xlsxStreamParser';

describe('XLSX Streaming Parser', () => {
  const tempFilePath = path.join(__dirname, 'test_people.xlsx');

  beforeAll(async () => {
    // Create a sample XLSX file using ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    
    // Add rows to the worksheet
    worksheet.addRow(['BNEJWQZM', 'Thomas', 'Thierry', '2014/04/27', 'Suspendu']);
    worksheet.addRow(['CODE2', 'John', 'Doe', '2020/01/01', 'Active']);
    
    await workbook.xlsx.writeFile(tempFilePath);
  });

  afterAll(() => {
    // Clean up the temporary file after tests
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  });

  it('should stream rows correctly from XLSX file', async () => {
    const rows: string[][] = [];
    for await (const row of streamXlsxRows(tempFilePath)) {
      rows.push(row);
    }
    expect(rows).toEqual([
      ['BNEJWQZM', 'Thomas', 'Thierry', '2014/04/27', 'Suspendu'],
      ['CODE2', 'John', 'Doe', '2020/01/01', 'Active']
    ]);
  });
});
