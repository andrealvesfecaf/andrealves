import { Pool } from 'pg';

// Substitua pela sua string de conexão do Render.com
const connectionString = "postgresql://postgres:GrbULKxvtPgxAQwXxFZmQMtpIaUqOCAv@autorack.proxy.rlwy.net:48973/railway";
const database = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  }
});

export default database;