const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //takes property of mongoose, Schema, and assign to Scheme. equivalent to above

const userSchema = new Schema({
	//define schema for users
	googleId: String,
	credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema); //make a new collection called users
