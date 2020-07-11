require('dotenv').config()

module.exports = {
    dbURI: `mongodb+srv://ameen:${process.env.API_KEY}@shopping-list.fentv.mongodb.net/mern-tuts?retryWrites=true&w=majority`
}  