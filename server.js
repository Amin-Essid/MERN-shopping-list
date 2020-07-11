const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path')

const app = express();

//BodyParser Middlware
app.use(bodyParser.json());

// DB config
const dbURI = require('./config/keys').dbURI;

// connect to mongo 
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log(err))

// use routes
app.use('/api/items', items)

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