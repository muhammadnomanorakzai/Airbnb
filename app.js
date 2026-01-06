// ========================================
//  STEP 0: DOTENV (ONLY FOR LOCAL)
// ========================================
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ========================================
//  STEP 1: IMPORTING DEPENDENCIES
// ========================================
const express = require("express");
const app = express();
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const PORT = process.env.PORT || 8080;

// ========================================
//  STEP 2: ROUTES
// ========================================
const listingsRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const userRouter = require("./routes/user");

// ========================================
//  STEP 3: VIEW ENGINE + MIDDLEWARE
// ========================================
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ========================================
//  STEP 4: DATABASE CONNECTION (ENV SAFE)
// ========================================
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) {
  console.error("❌ MONGO_URL is missing in environment variables");
  process.exit(1);
}

mongoose
  .connect(dbUrl)
  .then(() => console.log("📌 MongoDB Connected Successfully"))
  .catch((err) => console.log("Mongo Error:", err));

// ========================================
//  STEP 5: SESSION CONFIG (ENV SAFE)
// ========================================
const sessionOptions = {
  name: "session",
  secret: process.env.SESSION_SECRET || "fallbacksecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ========================================
//  STEP 6: PASSPORT CONFIG
// ========================================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========================================
//  STEP 7: GLOBAL MIDDLEWARE
// ========================================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ========================================
//  STEP 8: ROUTES
// ========================================
app.use("/", userRouter);
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);

// ========================================
//  STEP 10: SERVER (RAILWAY SAFE)
// ========================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
