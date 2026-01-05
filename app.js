if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// ========================================
//  STEP 1: IMPORTING ALL DEPENDENCIES
//  (Application me use honay wale tools)
// ========================================
const express = require("express"); // Express framework (routing + middleware)
const app = express(); // App create karna
const engine = require("ejs-mate"); // EJS layouts support
const mongoose = require("mongoose"); // MongoDB connection
const path = require("path"); // File paths handle
const methodOverride = require("method-override"); // PUT/DELETE enable
const session = require("express-session"); // User sessions
const flash = require("connect-flash"); // Flash messages
const passport = require("passport"); // Authentication middleware
const LocalStrategy = require("passport-local"); // Local login strategy
const User = require("./models/user"); // User model import

// ============================
//  STEP 2: ROUTES IMPORT
// ============================
const listingsRouter = require("./routes/listing"); // Listings related routes
const reviewsRouter = require("./routes/review"); // Reviews related routes
const userRouter = require("./routes/user"); // Login/Register routes

// ========================================
//  STEP 3: EJS VIEW ENGINE + STATIC FILES
// ========================================

// EJS ko view engine set karna
app.set("view engine", "ejs");

// Views folder ka complete path
app.set("views", path.join(__dirname, "views"));

// Public folder ko static banana (CSS/JS serve yahan se honge)
app.use(express.static(path.join(__dirname, "/public")));

// Form data accept karne ke liye
app.use(express.urlencoded({ extended: true }));

// PUT/DELETE ko enable karne ke liye
app.use(methodOverride("_method"));

// EJS layouts enable
app.engine("ejs", engine);

// ========================================
//  STEP 4: DATABASE CONNECTION
// ========================================
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => console.log("📌 MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

// ========================================
//  STEP 5: SESSION CONFIGURATION
// ========================================
const sessionOptions = {
  secret: "mysupersecretcode", // Cookie encrypt karne ke liye secret key
  resave: false, // Har request par session ko force save nahi karega
  saveUninitialized: true, // Empty session banega jab tak data na ho
  Cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiry
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // JavaScript se cookie access nahi hogi
  },
};

// ========================================
//  STEP 6: BASIC ROOT ROUTE (TESTING)
// ========================================
app.get("/", (req, res) => {
  res.send("Hi, I am root node!");
});

// ========================================
//  STEP 7: SESSION + PASSPORT + FLASH SETUP
// ========================================

// Sessions enable
app.use(session(sessionOptions));

// Flash messages enable
app.use(flash());

// Passport initialize (authentication start)
app.use(passport.initialize());

// Passport ko session ke sath link karna
app.use(passport.session());

// Local strategy use (username/password)
passport.use(new LocalStrategy(User.authenticate()));

// User ko session me store karna
passport.serializeUser(User.serializeUser());

// Session se user ko nikalna
passport.deserializeUser(User.deserializeUser());

// ========================================
//  STEP 8: FLASH + LOGGED-IN USER MIDDLEWARE
// ========================================
// Ye middleware har page ki EJS file me
// success/error message aur logged-in user ko available banata hai
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // Passport logged-in user
  next();
});

// ========================================
//  STEP 9: ROUTING SETUP
// ========================================
app.use("/listings", listingsRouter); // Listings CRUD routes
app.use("/listings/:id/reviews", reviewsRouter); // Reviews routes
app.use("/", userRouter); // Login/Register routes

// ========================================
//  STEP 10: SERVER LISTENING
// ========================================
app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});

// installations dependences
// # Remove current dependencies
// rm -rf node_modules yarn.lock

// # Install specific compatible versions
// yarn add express@4.18.2
// yarn add mongoose@6.8.0
// yarn add passport@0.5.3
// yarn add passport-local@1.0.0
// yarn add passport-local-mongoose@7.1.2
// yarn add express-session@1.17.3
// yarn add ejs@3.1.8
// yarn add ejs-mate@3.0.0
// yarn add multer@1.4.5
