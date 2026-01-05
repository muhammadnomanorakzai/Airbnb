// =======================
// IMPORTS & SETUP
// =======================

// express import kar rahe hain
const express = require("express");
// router banaya, taake is file me saare routes manage ho saken
const router = express.Router();

// wrapAsync helper — yeh async route me error automatically next() ko pass karta hai
const wrapAsync = require("../utils/wrapAsync");

// Listing model — MongoDB me listing documents ko store / read karne ke liye
const Listing = require("../models/listing");

// Middleware functions import kiye
// isLoggedIn  → check karega user logged in ha ya nahi
// isOwner     → check karega listing ka owner kaun hai
// validationListing → Joi validation jo server side values check karta hai
const { isLoggedIn, isOwner, validationListing } = require("../middleware");

// controller access

const listingController = require("../controller/listings");

//
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// ======================================================
// 1️⃣ INDEX ROUTE — All Listings
// ======================================================
// Roman Urdu: Sare listings database se la kar index page me show karta hai

// GET /listings
router.get("/", wrapAsync(listingController.index));

// ======================================================
// 2️⃣ NEW ROUTE — Create New Listing Form
// ======================================================
// Roman Urdu: Nayi listing create karne ka form show karta hai

// GET /listings/new
router.get("/new", isLoggedIn, listingController.createNewForm);

// ======================================================
// 3️⃣ SHOW ROUTE — Show Details of Single Listing
// ======================================================
// Roman Urdu: Specific listing ko uski ID se fetch kar ke details page show karta hai

// GET /listings/:id
router.get("/:id", wrapAsync(listingController.showRoutes));

// ======================================================
// 4️⃣ CREATE ROUTE — Save New Listing
// ======================================================
// Roman Urdu: Form submit hotay hi new listing database me save hoti hai

// POST /listings
router.post(
  "/",
  isLoggedIn, // Login check
  // to store image in cloud cloud
  upload.single("listing[image]"),
  validationListing, // Joi validation check
  wrapAsync(listingController.createRoute)
);

// ======================================================
// 5️⃣ EDIT ROUTE — Show Edit Form
// ======================================================
// Roman Urdu: Listing edit karne ka form show karta hai

// GET /listings/:id/edit
router.get(
  "/:id/edit",
  isLoggedIn, // login check
  isOwner, // owner check
  wrapAsync(listingController.editRoute)
);

// ======================================================
// 6️⃣ UPDATE ROUTE — Save Updated Listing
// ======================================================
// Roman Urdu: Form se aayi updated values database me save kar deta hai

// PUT /listings/:id
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  // to store image in cloud cloud
  upload.single("listing[image]"),
  validationListing,
  wrapAsync(listingController.updateRoute)
);

// ======================================================
// 7️⃣ DELETE ROUTE — Delete Listing
// ======================================================
// Roman Urdu: Listing ko id se delete kar deta hai

// DELETE /listings/:id
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyRoute)
);

// Export router — app.js me use hogi
module.exports = router;
