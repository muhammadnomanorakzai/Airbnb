// ====================================================
// 1) Import Statements – Ye sabse pehla kaam hota hai
// ====================================================

// Custom Express Error Class — server errors ko handle karne ke liye use hoti hai
const ExpressError = require("./utils/ExpressError");

// Joi Schema Validation — Listing aur Review forms ki server-side validation ke liye
const { listingSchema, reviewSchema } = require("./schema");

// Review Model — Review documents ko DB se find, create, delete karne ke liye
const Review = require("./models/review");

// Listing Model — Listing ko DB me find, update, create karne ke liye
const Listing = require("./models/listing");

// ====================================================
// 2) Authentication Middleware — Login Check
// ====================================================
// Yahan check hota hai ke user logged in hai ya nahi
// IMPORTANT: Is function ko protect routes par sabse pehle lagana hota hai
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // User jis page par jana chahta tha, uska URL save kar lo
    req.session.redirectUrl = req.originalUrl;

    req.flash("error", "you must be logged in to create listings");
    return res.redirect("/login"); // Login page par redirect kar do
  }
  next(); // user logged in hai → next middleware run hoga
};

// ====================================================
// 3) Redirect URL Save Middleware
// ====================================================
// Yeh middleware hamesha isLoggedIn ke BAAD chalaya jata hai
// Taake login ke baad user ko usi page par bheja ja sake
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    // locals me redirectUrl save kiya — view files me access ho jata hai
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// ====================================================
// 4) Authorization Check — Logged In User = Owner?
// ====================================================
// YEH MIDDLEWARE sirf un routes par lagta hai jahan kisi resource ka malik hona zaroori hai
// Example: /listings/:id/edit or delete
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;

  // Listing fetch kar rahe hain database se
  let listing = await Listing.findById(id);

  // Check: Listing owner == Current logged in user?
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "Your Not The Owner Of The Listing");
    return res.redirect(`/listings/${id}`);
  }

  next(); // Owner pass → next middleware run kare
};

// ====================================================
// 5) Joi Listing Validation Middleware
// ====================================================
// Is middleware ka kaam form data ko server side validate karna hai
// IMPORTANT: Ye body parsing ke BAAD aur DB operations se PEHLE chalta hai
module.exports.validationListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body); // body se joh data aaya usko validate karo

  if (error) {
    // Joi se aane wale sari error messages ko merge kar diya
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg); // Error throw kar do → Error handler middleware catch karega
  } else {
    next(); // Data valid → next middleware
  }
};

// ====================================================
// 6) Joi Review Validation Middleware
// ====================================================
// Review form submit hone par data yahan validate hota hai
module.exports.validationReview = (req, res, next) => {
  console.log(req.body); // Form se kya data aya console me check kar sakte ho

  const { error } = reviewSchema.validate(req.body);

  if (error) {
    console.log("Validation failed:", error.details);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg); // Validation fail → throw error
  } else {
    console.log("Validation passed!");
    next();
  }
};

// ====================================================
// 7) Review Owner Check — Review Modify/Delete ka right?
// ====================================================
// Ye middleware ensure karta hai ke review jisne likha hai
// sirf wahi user usko delete ya update kar sakta hai
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;

  // DB se review fetch kar lo
  let review = await Review.findById(reviewId);

  // Check: Review ka author logged in user match karta hai?
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are Not The Owner Of This Review ");
    return res.redirect(`/listings/${id}`);
  }

  next(); // Pass → next middleware
};
