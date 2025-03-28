const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;
const { spawn } = require('child_process');

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

app.post('/convert', async (req, res) => {
  try {
    const { measurements, bagModel, materials } = req.body;

    // Spawn a child process to run the 2D to 3D converter
    const converterProcess = spawn('node', ['/workspaces/EGO/ego-platform/tools/2d-to-3d-converter/js/converter.js', JSON.stringify({ measurements, bagModel, materials })]);

    let result = '';

    converterProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    converterProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    converterProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        res.json({ message: 'Conversion successful', data: result });
      } else {
        res.status(500).json({ error: 'Conversion failed' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});