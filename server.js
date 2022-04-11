// GET dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Creation of express app
const app = express();

// Parse for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cfg. from 'dist' directory as static directory.
app.use(express.static(path.join(__dirname, 'dist/mean-stack/')));

// Cfg. from routes
app.get('/api', (req, res) => {
    res.send('The api works.');
});

require('./server/routes/task')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/mean-stack/index.html'));
});

// Cfg. from listener port
const port = process.env.port || '3000';
app.set('port', port);

// Creation from http server with express and open port
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));


/////////////////////////////////////////////////////////////////
////// Connection to the database MongoDB through Mongoose //////
/////////////////////////////////////////////////////////////////
let dbURI = 'mongodb://localhost:27017';
mongoose.connect(dbURI, { dbName: 'db_mean', user: 'mongo', pass: 'm0ng01234' });

// Setting events of connection
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    })
})
