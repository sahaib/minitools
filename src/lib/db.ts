import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, text, timestamp, varchar, uuid } from 'drizzle-orm/pg-core';

// Database connection
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: true,
});

// Database schema
export const suggestions = pgTable('suggestions', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull(),
  suggestion: text('suggestion').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  ip: varchar('ip', { length: 50 }),
});

export const db = drizzle(pool, { schema: { suggestions } }); 