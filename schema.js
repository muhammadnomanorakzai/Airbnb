const Joi = require("joi");

// =====================================
// Server Side Validation Schemas
// Roman Urdu: Yeh humare forms ki validation karta hai.
// Agar user ghalat ya empty data bhejta hai to yahan error aayega.
// =====================================

// ========================
// Listing Schema Validation
// ========================
// Roman Urdu:
// Yeh validation "listing" create aur update karte waqt lagti hai.
// Ensure: title, description, location, country, price sab required hain.
// Image agar na ho to empty string ya null allow hai.
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(), // Roman Urdu: Title lazmi hona chahiye
    description: Joi.string().required(), // Roman Urdu: Description required hai
    location: Joi.string().required(), // Roman Urdu: Location required hai
    country: Joi.string().required(), // Roman Urdu: Country required hai
    price: Joi.number().min(0).required(), // Roman Urdu: Price negative nahi ho sakta
    image: Joi.string().allow("", null), // Roman Urdu: Image optional hai
  }).required(),
});

// ========================
// Review Schema Validation
// ========================
// Roman Urdu:
// Review form ke andar rating aur comment dono required hain.
// Rating sirf 1 se 5 ke beech ho sakti hai.
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5), // Roman Urdu: Rating 1–5 required
    comment: Joi.string().required(), // Roman Urdu: Comment required
  }).required(),
});
