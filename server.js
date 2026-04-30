require('dotenv').config();

const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Environment variable
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "My App";

// In-memory data
let items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" }
];

// GET endpoint
app.get('/api/items', (req, res) => {
  res.json({
    app: APP_NAME,
    data: items
  });
});

// POST endpoint
app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };

  if (!newItem.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  items.push(newItem);
  res.status(201).json(newItem);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

document.getElementById("status").innerText = "Loading...";