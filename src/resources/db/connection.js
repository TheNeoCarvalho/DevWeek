const mongoose = require('mongoose')

let conn = null

const URI = 'mongodb+srv://app:aQbP!@12@cluster0.pvlax.mongodb.net/secret?retryWrites=true&w=majority'


module.exports = async() = {

    if(!conn){
        conn = mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
        await conn
    }

}