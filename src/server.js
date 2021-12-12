import chalk from 'chalk';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

//error handler
import errorHandler from './middleware/error.js'

//database
import db from '../config/db.js';

//routes
import auth from './routes/auth.js';
import contacts from './routes/contacts.js';
import users from './routes/users.js';

dotenv.config({ path: './config/.env' }); //load .env variables
db.connect();

const prefix = '[server-api]'
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //use express.json() than the bodyParser.json()

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev')); // middleware
}

//apis
app.use('/api/v1/auth', auth);
app.use('/api/v1/contacts', contacts);
app.use('/api/v1/users', users);

app.use(errorHandler);


//server
app.listen(
  PORT,
  console.log(`${prefix} running in ${chalk.yellow(process.env.NODE_ENV)} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {

  console.log(chalk.red(`${prefix} error ${err.message}`))
  //server.close(() => process.exit(1)); // close server & exit process

});