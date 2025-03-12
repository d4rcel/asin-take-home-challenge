import { parse } from 'csv-parse';
import { createReadStream } from 'fs';

/**
 * Asynchronously iterates over CSV records from a given file path.
 * @param filePath - The CSV file path.
 */
export async function* streamCsv(filePath: string): AsyncGenerator<string[], void, unknown> {
  const parser = createReadStream(filePath).pipe(parse({ trim: true }));
  for await (const record of parser) {
    yield record as string[];
  }
}
