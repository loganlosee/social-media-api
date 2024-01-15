const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// test db connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB database');
});

// Server test
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
