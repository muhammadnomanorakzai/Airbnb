// Joi se string aur number import ho raha hai (optional validation ke liye)
const { string, number } = require("joi");

// Mongoose ko import karna (MongoDB ke sath kaam karne ke liye)
const mongoose = require("mongoose");

// Schema class nikal rahe hain taake hum new schema bana saken
const Schema = mongoose.Schema;

// Review ka main schema
const ReviewSchema = new Schema({
  // review ka comment — user kya likhta hai
  comment: String,

  // rating field — user rating de sakta hai 1 se 5 tak
  rating: {
    type: Number, // rating number honi chahiye
    min: 1, // minimum rating 1
    max: 5, // maximum rating 5
  },

  // ye field review kab create hua — default abhi ka time
  createdAt: {
    type: Date,
    default: Date.now(), // har new review ka time automatically store ho jata hai
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Model create aur export kar rahe hain
// "review" collection name hoga database me
module.exports = mongoose.model("review", ReviewSchema);
