const mongoose = require('mongoose');
const userSchema = require('./userSchema');

mongoose.connect(process.env.MONGO_URI| 'mongodb+srv://dataBaseUsr:dbUser@cluster0.wqkqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log("connected to the database");
    })
    .catch(() => console.log("error when connecting"));

mongoose.connection.on("connected", ()=>{
    console.log("connected");
})
