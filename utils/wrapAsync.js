// wrapAsync ek helper function hai jo async route functions me errors ko automatically catch karta hai
// Roman Urdu: Agar hum directly async function likhen aur error aaye to server crash ho sakta hai
// wrapAsync is problem ko solve karta hai aur next(error) ko call karta hai

module.exports = function wrapAsync(fn) {
  return function (req, res, next) {
    // fn = async function jo route me pass kiya gaya hai
    // agar fn me koi error throw hota hai → .catch(next) automatically Express ko bhej deta hai
    fn(req, res, next).catch(next);
  };
};
