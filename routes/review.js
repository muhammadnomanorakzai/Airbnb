// =======================
// IMPORTS & SETUP
// =======================

// express import kar rahe hain
const express = require("express");

// mergeParams: true ka matlab:
// Parent route "listings/:id/reviews" ka :id yahan bhi available hoga
const router = express.Router({ mergeParams: true });

// wrapAsync async functions me errors ko next() ke through pass karta hai
const wrapAsync = require("../utils/wrapAsync");

// Review aur Listing MongoDB models import kar rahe hain
const Review = require("../models/review");
const Listing = require("../models/listing");
const ReviewController = require("../controller/reviews");

// Middleware functions:
// validationReview → Joi validation
// isLoggedIn → login check
// isReviewAuthor → review owner check
const {
  validationReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware");

// ======================================================
// 1️⃣ POST Route — Create New Review
// ======================================================
// Roman Urdu:
// User review submit kare → Listing par new review add hota hai

// POST /listings/:id/reviews
router.post(
  "/",
  isLoggedIn, // user login check
  validationReview, // Joi validation check
  wrapAsync(ReviewController.createNewReview)
);

// ======================================================
// 2️⃣ DELETE Route — Delete Review
// ======================================================
// Roman Urdu:
// 1. Listing ke reviews array se review id remove karo
// 2. Review ko database se delete karo

// DELETE /listings/:id/reviews/:reviewId
router.delete(
  "/:reviewId",
  isLoggedIn, // user login check
  isReviewAuthor, // sirf author review delete kar sakta hai
  wrapAsync(ReviewController.DestroyReview)
);

// Export router — app.js me mount hoga
module.exports = router;
