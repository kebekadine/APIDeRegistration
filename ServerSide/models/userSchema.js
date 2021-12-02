const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Email requis']
  },
  password: {
    type: String,
    required: [true, 'mot de passe requis']
  }
})

module.exports = userSchema