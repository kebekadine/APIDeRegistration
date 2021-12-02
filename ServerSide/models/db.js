const mongoose = require('mongoose');
require("./dbConfig");
const userSchema = require('./userSchema');
const user = mongoose.model('userSchema', userSchema);
