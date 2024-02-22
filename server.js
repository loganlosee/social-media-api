const express = require('express');
const routes = require('./routes');
const runDB = require("./config/connection.js");
const app = express();

const PORT = process.env.PORT || 3001;

runDB();

app.use(express.json());

app.use(routes);
// Server error handling
app.use((req, res) => {
  res.status(404).send("OOPS, page not found");
});

const server = app.listen(PORT, () => {
  const address = server.address();
  if (address) {
    const protocol = address.protocol || "http";
    const host = "localhost"; 
    const port = address.port || PORT;

    console.log(`Server running on ${protocol}://${host}:${port}`);
  } else {
    console.error("Failed to retrieve server address.");
  }
});
