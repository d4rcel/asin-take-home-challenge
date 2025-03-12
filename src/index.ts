import { initDb, insertPeopleBatch } from './db';
import { streamXlsxRows } from './xlsxStreamParser';

async function main(): Promise<void> {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npm start -- people.xlsx");
    process.exit(1);
  }

  const startTime = Date.now();
  const db = await initDb();

  try {
    const batchSize = 1000;
    let batch: string[][] = [];
    let totalRecords = 0;

    for await (const row of streamXlsxRows(filePath)) {
      batch.push(row);
      if (batch.length === batchSize) {
        await insertPeopleBatch(db, batch);
        totalRecords += batch.length;
        batch = [];
      }
    }

    // Insert any remaining records
    if (batch.length > 0) {
      await insertPeopleBatch(db, batch);
      totalRecords += batch.length;
    }

    console.log(`Inserted ${totalRecords} records from people.xlsx in ${Date.now() - startTime} ms (${(Date.now() - startTime) / 1000} s).`);
  } catch (err) {
    console.error("Error processing the file:", err);
    process.exit(1);
  } finally {
    await db.close();
  }
}

main();