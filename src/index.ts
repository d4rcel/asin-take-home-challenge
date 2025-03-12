import { initDb, insertPeople } from './db';
import { parseCsv } from './csvParser';

async function main(): Promise<void> {
  const startTime = Date.now();

  // Initialize (or create) the database and table
  const db = await initDb();

  try {
    // Parse CSV data from stdin
    const records = await parseCsv(process.stdin);
    // Insert the parsed records into the database
    await insertPeople(db, records);

    const endTime = Date.now();
    const elapsed = endTime - startTime;
    console.log(`Inserted ${records.length} records in ${elapsed} ms.`);
  } catch (err) {
    console.error('Error processing CSV:', err);
    process.exit(1);
  } finally {
    await db.close();
  }
}

main();
