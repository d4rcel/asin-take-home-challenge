import { initDb, insertPeopleBatch } from '../src/db';
import { Database } from 'sqlite';

describe('Database Module', () => {
  let db: Database;

  beforeAll(async () => {
    // Use an in-memory database for testing
    db = await initDb(':memory:');
  });

  afterAll(async () => {
    await db.close();
  });

  it('inserts people records and retrieves them', async () => {
    const people = [
      ['BNEJWQZM', 'Thomas', 'Thierry', '2014/04/27', 'Suspendu'],
      ['CODE2', 'John', 'Doe', '2020/01/01', 'Active']
    ];

    await insertPeopleBatch(db, people);
    const rows = await db.all('SELECT * FROM people');
    expect(rows.length).toBe(2);
    expect(rows[0]).toMatchObject({
      code: 'BNEJWQZM',
      first_name: 'Thomas',
      last_name: 'Thierry',
      date: '2014/04/27',
      status: 'Suspendu'
    });
  });
});
