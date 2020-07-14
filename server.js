const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

//BodyParser Middlware
app.use(express.json());

// DB config
const dbURI = require('./config/keys').dbURI;

// connect to mongo 
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log(err))

// use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve Static Assets if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendDate(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listen on port ${port}`))