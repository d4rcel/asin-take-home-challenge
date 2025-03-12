import ExcelJS from 'exceljs';

/**
 * Async generator that streams rows from an XLSX file using exceljs streaming API.
 * @param filePath - The XLSX file path.
 * @returns An async generator yielding each row as an array of strings.
 */

export async function* streamXlsxRows(filePath: string): AsyncGenerator<string[]> {

  // Create a streaming workbook reader
  const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(filePath, {});

  for await (const worksheet of workbookReader) {
    // For each worksheet, stream rows
    for await (const row of worksheet) {
      // row.values is 1-indexed; remove the first element if it is undefined
      let values = row.values as any[];
      if (values[0] === undefined) {
        values = values.slice(1);
      }
      // Convert all values to strings (or empty string if null/undefined)
      yield values.map(val => val !== undefined && val !== null ? val.toString() : '');
    }
  }
}
