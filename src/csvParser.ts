import { parse } from 'csv-parse';
import { Readable } from 'stream';

/**
 * Parses CSV data from a readable stream.
 * @param stream - The input stream containing CSV data.
 * @returns A Promise that resolves with an array of records.
 */
export function parseCsv(stream: NodeJS.ReadableStream): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const records: string[][] = [];
    stream
      .pipe(parse({ trim: true }))
      .on('data', (row: string[]) => records.push(row))
      .on('end', () => resolve(records))
      .on('error', (err: Error) => reject(err));
  });
}
