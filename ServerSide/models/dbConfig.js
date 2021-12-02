const mongoose = require('mongoose');
const userSchema = require('./userSchema');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to the database");
    })
    .catch(() => console.log("error when connecting"));

mongoose.connection.on("connected", ()=>{
    console.log("connected");
})
