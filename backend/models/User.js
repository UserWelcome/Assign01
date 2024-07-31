const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    howDidYouHear: { type: [String], required: true }
});
const NewUserSchema  = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    
});

const User=mongoose.model('User',UserSchema);
const UserAdd=mongoose.model('NewUser',NewUserSchema);
module.exports = {User,UserAdd};
