require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { PORT, MONGO_DB } = process.env;

app.use(express.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Succesfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);

    process.exit();
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
