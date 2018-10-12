// Packages

const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Routes

//const genres = require('./routes/genres');
//const customers = require('./routes/customers');

const broadcasts = require('./routes/broadcasts');
const testbroadcasts = require('./routes/testbroadcasts');
const home = require('./routes/home');

// Database connect 

mongoose.connect('mongodb://localhost/AIS')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch( err => console.error('Could not connect to mongodb'));



//app.set('view engine', 'pug');
//app.set('views','./views');

// Routes for app

app.use(express.json());

//app.use('/api/genres', genres);
//app.use('/api/customers', customers);
app.use('/api/broadcasts', broadcasts);
app.use('/api/testbroadcasts', testbroadcasts)
//app.use('/', home);

app.use(express.static(__dirname + '/public'));

// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     debug('Morgan is enabled');
// }

// app.use(logger);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`listening on port ${port}...`));