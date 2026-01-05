const usersController = require("../controller/users");

// =======================
// IMPORTS & SETUP
// =======================

// Express import kar rahe hain
const express = require("express");
const router = express.Router();

// MongoDB user model import
const User = require("../models/user");

// Async errors ko handle karne ke liye helper
const wrapAsync = require("../utils/wrapAsync");

// Passport authentication system
const passport = require("passport");

// Redirect URL middleware (agar user restricted page open kare)
const { saveRedirectUrl } = require("../middleware");

// =====================================================
// 1️⃣ GET — Signup Form
// =====================================================
// Roman Urdu:
// Ye sirf signup page render karta hai
router.get("/signup", usersController.renderSignupForm);

// =====================================================
// 2️⃣ POST — Create New User (Signup Form Submit)
// =====================================================
// Roman Urdu:
// User form submit kare → yahan user create hota hai → login hota hai
router.post("/signup", wrapAsync(usersController.createNewUser));

// =====================================================
// 3️⃣ GET — Login Form
// =====================================================
// Roman Urdu:
// Ye sirf login page show karta hai
router.get("/login", usersController.renderLoginForm);

// =====================================================
// 4️⃣ POST — Login User
// =====================================================
// Roman Urdu:
// passport.authenticate("local"):
// Username + password verify karta hai
router.post(
  "/login",

  // Middleware → login se pehle redirect URL save karo
  saveRedirectUrl,

  // Passport authentication function
  passport.authenticate("local", {
    failureRedirect: "/login", // Wrong password ho to redirect karega
    failureFlash: true, // Flash message show karega
  }),

  usersController.login
);

// =====================================================
// 5️⃣ GET — Logout User
// =====================================================
// Roman Urdu:
// User ko logout kar deta hai aur session destroy ho jata hai
router.get("/logout", usersController.logoutUser);

// Export router
module.exports = router;
