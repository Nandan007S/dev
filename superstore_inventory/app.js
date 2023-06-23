const express = require('express');
const port = 3000;
const inventory = require('./inventory');

const app = express();

app.use(express.json());
app.use('/superstore/inventory',inventory);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });