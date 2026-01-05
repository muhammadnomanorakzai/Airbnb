// Mongoose import kar rahe hain (MongoDB ke sath connect aur schema banane ke liye)
const mongoose = require("mongoose");

// Mongoose Schema class — is se hum new schema create karte hain
const Schema = mongoose.Schema;

// Passport-local-mongoose plugin import
// Ye plugin user authentication ko asaan banata hai
// Is se automatic username, salt, hash, authenticate() functions mil jate hain
const passportLocalMongoose = require("passport-local-mongoose");

// User ka schema
const userSchema = new Schema({
  // User ka email field — required hona chahiye
  email: {
    type: String,
    required: true,
  },
});

// Yahan plugin lagaya ja raha hai
// Ye automatic username & password handling add karta hai:
// - username field create karta hai
// - password ko hash + salt ke sath securely store karta hai
// - login ke liye authenticate() method provide karta hai
userSchema.plugin(passportLocalMongoose);

// User model export kar rahe hain
// "User" naam ka collection database me create hoga
module.exports = mongoose.model("User", userSchema);
