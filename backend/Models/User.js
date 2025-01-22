const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/clozt');

const userSchema = mongoose.Schema({
    username: String, 
    email: String,
    mobile: Number,
    password: String,
}); 

mongoose.exports = mongoose.model("user", userSchema);