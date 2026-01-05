const mongoose = require("mongoose");
const Review = require("./review"); // Review model ko import kiya (reviews ko delete karne ke liye)
const { listingSchema } = require("../schema"); // JOI validation schema (backend validation ke liye)

const Schema = mongoose.Schema;

// ==============================
//  Listing Schema
// ==============================
const ListingSchema = new Schema({
  // Title field — string hona zaroori hai
  title: {
    type: String,
    required: true, // Required ka matalb: ye fill karna hi hoga
  },

  // Image field — agar user image na de to default image save ho jati hai
  // to store image in cloud cloud
  image: {
    url: String,
    fileName: String,
  },

  // Description (optional)
  description: String,

  // Price (number)
  price: Number,

  // Place ka location
  location: String,

  // Country name
  country: String,

  // Ek listing ke multiple reviews ho sakte hain — array ke andar ObjectId store hoga
  reviews: [
    {
      type: Schema.Types.ObjectId, // Review ka ID yahan save hota hai
      ref: "review", // Reference model (populate karne ke liye)
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// ==============================
//  Mongoose Middleware
// ==============================
// Jab koi listing delete hogi → uske saath saare related reviews bhi delete honge
// Ye automatic cleanup hota hai (backend par)
ListingSchema.post("findOneAndDelete", async (listing) => {
  // Agar listing exist karti thi tabhi delete karo
  if (listing) {
    // Delete all reviews jinka ID listing.reviews me maujood hai
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// ==============================
//  Export Model
// ==============================
const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
