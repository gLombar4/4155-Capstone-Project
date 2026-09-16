require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// Allow requests from the Vite dev server
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Health check route to confirm the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});