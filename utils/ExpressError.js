// Custom Error Class for Express
// Roman Urdu: Agar hum chahte hain ke koi bhi route me error aaye to hum is class ko throw kar saken

class ExpressError extends Error {
  // Constructor me status aur message pass karte hain
  constructor(status, message) {
    super(); // parent Error class ka constructor call karna zaruri hai
    this.status = status; // Roman Urdu: HTTP status code store kare (404, 500, etc.)
    this.message = message; // Roman Urdu: Error message store kare
  }
}

// Export kar rahe hain taake app me import karke use kar saken
module.exports = ExpressError;
