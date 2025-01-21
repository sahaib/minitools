const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const runMigrations = async () => {
  if (!process.env.NEON_DATABASE_URL) {
    throw new Error('NEON_DATABASE_URL is not set');
  }

  const sql = neon(process.env.NEON_DATABASE_URL);
  
  console.log('⏳ Running migrations...');
  
  const migrationSQL = fs.readFileSync(
    path.join(process.cwd(), 'drizzle', '0000_create_suggestions.sql'),
    'utf-8'
  );
  
  await sql(migrationSQL);
  
  console.log('✅ Migrations completed!');
  process.exit(0);
};

runMigrations().catch((err) => {
  console.error('❌ Migration failed!');
  console.error(err);
  process.exit(1);
}); 