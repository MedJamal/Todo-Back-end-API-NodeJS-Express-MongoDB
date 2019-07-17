const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');

const routes = require('./routes/Routes');

/**
 * Database config
 */
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to the database');
});
mongoose.connection.on('error', (err) => {
    console.error(`Failed to connected to the database: ${err}`);
});

/**
 * Middleware config
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

/**
 * Routes
 */

app.use('/api', routes);

/**
 * Errors handling
 */

//404 Not Found
app.use((request, response, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, request, response, next) => {
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';

    response.status(status).send({
        error
    })
});

module.exports = app;