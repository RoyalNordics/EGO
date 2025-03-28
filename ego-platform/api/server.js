const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.get('/designs', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM designs');
    const designs = result.rows;
    client.release();
    res.json(designs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/orders', (req, res) => {
  res.json({ message: 'Orders endpoint' });
});

app.get('/users', (req, res) => {
  res.json({ message: 'Users endpoint' });
});

app.get('/track', (req, res) => {
  res.json({ message: 'Track endpoint' });
});

app.get('/config', (req, res) => {
  res.json({ message: 'Config endpoint' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});