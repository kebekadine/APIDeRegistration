const mongoose = require('mongoose');
const userSchema = require('./userSchema');

mongoose.connect('mongodb+srv://dataBaseUsr:dbUser@cluster0.wqkqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log("connected to the database");
    })
    .catch((e) => {
    console.log("error when connecting");
    console.log(e);
    }
    );

mongoose.connection.on("connected", ()=>{
    console.log("connected");
})
