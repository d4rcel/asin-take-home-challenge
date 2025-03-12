import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

/**
 * Initialize the database connection and create the table if it doesn't exist.
 * @param dbFile - The file path for the SQLite database.
 * @returns A Promise that resolves with the Database instance.
 */
export async function initDb(dbFile: string = './importer.db'): Promise<Database> {
  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT,
      first_name TEXT,
      last_name TEXT,
      date TEXT,
      status TEXT
    );
  `);

  return db;
}

/**
 * Inserts an array of people records into the database using a transaction.
 * @param db - The Database instance.
 * @param people - An array of records, where each record is a string array of [code, first_name, last_name, date, status].
 */
export async function insertPeople(db: Database, people: string[][]): Promise<void> {
  const insertStmt = await db.prepare(
    'INSERT INTO people (code, first_name, last_name, date, status) VALUES (?, ?, ?, ?, ?)'
  );

  try {
    await db.exec("BEGIN TRANSACTION");
    for (const row of people) {
      // Spread the row array into individual arguments
      await insertStmt.run(...row);
    }
    await db.exec("COMMIT");
  } catch (err) {
    await db.exec("ROLLBACK");
    throw err;
  } finally {
    await insertStmt.finalize();
  }
}
