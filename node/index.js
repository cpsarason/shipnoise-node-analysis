const config = require('config');

const express = require('express');
const app = express();

//const genres = require('./routes/genres');
//const customers = require('./routes/customers');

const broadcasts = require('./routes/broadcasts');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/AIS')
    .then(()=> console.log('Connected to MongoDB...'))
    .catch( err => console.error('Could not connect to mongodb'));

//app.set('view engine', 'pug');
//app.set('views','./views');


app.use(express.json());

//app.use('/api/genres', genres);
//app.use('/api/customers', customers);

app.use('/api/broadcasts', broadcasts);



// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     debug('Morgan is enabled');
// }

// app.use(logger);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`listening on port ${port}...`));