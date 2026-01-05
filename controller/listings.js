const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  // Database se saari listings fetch karo
  let allListings = await Listing.find({});
  // index.ejs me listings bhejo
  res.render("listings/index.ejs", { allListings });
};

module.exports.showRoutes = async (req, res) => {
  // URL se id nikaalo
  let { id } = req.params;

  // Listing find karo + reviews + owner details sath lao
  let listings = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  // Agar listing exist nahi karti
  if (!listings) {
    req.flash("error", "Listing you requested does not existed");
    return res.redirect("/listings");
  }

  // show page render karo
  res.render("listings/show.ejs", { listings });
};

module.exports.createNewForm = (req, res) => {
  // Sirf form show karna hai
  res.render("listings/new.ejs");
};

module.exports.createRoute = async (req, res) => {
  // to store image in cloud cloud
  let url = req.file.path;
  let fileName = req.file.fileName;
  // req.body.listing ke andar form ka data hota hai
  let newlistings = new Listing(req.body.listing);
  // to store image in cloud cloud
  newlistings.image = { url, fileName };
  // Current logged-in user ko owner set kar diya
  newlistings.owner = req.user._id;

  // Database me save karo
  await newlistings.save();

  // Flash success message
  req.flash("success", "new listing created!");

  // Redirect listing page par
  res.redirect("/listings");
};

module.exports.editRoute = async (req, res) => {
  let { id } = req.params;

  // listing find karo
  let listings = await Listing.findById(id);

  // Agar listing exist nahi karti
  if (!listings) {
    req.flash("error", "Listing you requested does not existed");
    return res.redirect("/listings");
  }
  let originalImageUrl = listings.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  // edit form render karna
  res.render("listings/edit.ejs", { listings, originalImageUrl });
};

module.exports.updateRoute = async (req, res) => {
  let { id } = req.params;

  // Spread operator se form ki saari fields update ho jayengi
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  // to store image in cloud cloud
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let fileName = req.file.fileName;
    listing.image = { url, fileName };
    await listing.save();
  }
  req.flash("success", "listing updated!");

  res.redirect(`/listings/${id}`);
};

module.exports.destroyRoute = async (req, res) => {
  let { id } = req.params;

  let deleteListings = await Listing.findByIdAndDelete(id);
  console.log(deleteListings);

  req.flash("success", "listing Deleted!");
  res.redirect("/listings");
};
