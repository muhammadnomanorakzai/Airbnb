const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createNewReview = async (req, res) => {
  // Parent listing ko id se find karna
  let listing = await Listing.findById(req.params.id);

  // Naya review object create karna
  let newReview = new Review(req.body.review);

  // Is review ka author currently logged-in user hoga
  newReview.author = req.user._id;

  // Listing ke reviews array me review push karna
  listing.reviews.push(newReview);

  // Dono ko save karna: listing aur review
  await listing.save();
  await newReview.save();

  // Flash message user ko batane ke liye
  req.flash("success", "New Review created!");

  // Listing show page par redirect karo
  res.redirect(`/listings/${listing._id}`);
};

module.exports.DestroyReview = async (req, res) => {
  // params se listing id aur review id dono nikaal rahe hain
  let { id, reviewId } = req.params;

  // Listing ke review array se review remove karna
  // $pull → array se specific element nikal deta hai
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Review document ko database se delete karna
  await Review.findByIdAndDelete(reviewId);

  // Flash message
  req.flash("success", "Review Deleted!");

  // Listing details page par redirect
  res.redirect(`/listings/${id}`);
};
