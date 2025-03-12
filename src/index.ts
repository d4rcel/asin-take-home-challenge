import { initDb, insertPeopleBatch } from './db';
import { streamCsv } from './csvParser';

async function main(): Promise<void> {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npm start <path-to-csv-file>");
    process.exit(1);
  }

  const startTime = Date.now();
  const db = await initDb();

  try {
    const batchSize = 1000;
    let batch: string[][] = [];
    let totalRecords = 0;

    for await (const record of streamCsv(filePath)) {
      batch.push(record);
      if (batch.length === batchSize) {
        await insertPeopleBatch(db, batch);
        totalRecords += batch.length;
        batch = [];
      }
    }

    if (batch.length > 0) {
      await insertPeopleBatch(db, batch);
      totalRecords += batch.length;
    }

    const endTime = Date.now();
    console.log(`Inserted ${totalRecords} records in ${endTime - startTime} ms.`);
  } catch (err) {
    console.error('Error processing CSV:', err);
    process.exit(1);
  } finally {
    await db.close();
  }
}

main();
