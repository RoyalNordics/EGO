const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/designs', (req, res) => {
  res.json({ message: 'Designs endpoint' });
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