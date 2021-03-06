import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.routes';

dotenv.config();

const app = express();

const { PORT, MONGO_DB } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose
  .connect(`${MONGO_DB}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Succesfully connected to the databases');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);

    process.exit();
  });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
  next();
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
