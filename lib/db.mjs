import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to open the database
export async function openDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
}

// Function to set up the database schema
export async function setupDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shortId TEXT UNIQUE,
      originalUrl TEXT,
      metaOgTitle TEXT,
      metaOgDescription TEXT,
      metaOgImage TEXT,
      ip TEXT
    )
  `);
  return db;
}