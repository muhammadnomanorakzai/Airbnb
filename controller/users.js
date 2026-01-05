const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.createNewUser = async (req, res, next) => {
  try {
    // Form fields ko destructure kar rahe hain
    let { username, email, password } = req.body;

    // Password ke baghair user object banaya
    const newUser = new User({ username, email });

    // Passport-local-mongoose password ko hash + salt ke sath save karta hai
    const registeredUser = await User.register(newUser, password);

    // Successful signup ke baad user ko automatically login karwana
    req.login(registeredUser, (err) => {
      if (err) return next(err);

      // Flash success message
      req.flash("success", "Welcome to Wanderlust!");

      // Successful signup ke baad listings par bhej do
      res.redirect("/listings");
    });
  } catch (e) {
    // Agar error aaye (e.g. username already exists)
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = // ✨ Successful login hone ke baad ye run hota hai
  async (req, res) => {
    req.flash("success", "Welcome to Wanderlust Property!");

    // Pehle user jahan ja raha tha wahan redirect karo
    // Agar koi redirect URL nahi to /listings par bhej do
    res.redirect(res.locals.redirectUrl || "/listings");
  };

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
