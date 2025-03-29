const express = require('express');
const { Pool } = require('pg');
const { spawn } = require('child_process');

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

// GET / → Root status check (Render browser fallback)
app.get('/', (req, res) => {
  res.send('EGO API is live 🚀');
});

// GET /api/health → Healthcheck til Roo og Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is alive and running ✅' });
});

// GET /designs → Hent alle design-rækker
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

// Placeholder endpoints
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

// POST /convert → Kald 2D→3D konverter som child process
app.post('/convert', async (req, res) => {
  try {
    const { measurements, bagModel, materials } = req.body;

    const converterProcess = spawn('node', [
      '/workspaces/EGO/ego-platform/tools/2d-to-3d-converter/js/converter.js',
      JSON.stringify({ measurements, bagModel, materials }),
    ]);

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

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
