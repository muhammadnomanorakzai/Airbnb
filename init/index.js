// =====================================================
// 1) Mongoose Import — MongoDB se connect karne ke liye
// =====================================================
const mongoose = require("mongoose");

// =====================================================
// 2) Dummy Data Import
// Roman Urdu: Ye woh data hai jo hum seed / initialize karna chahte hain
// =====================================================
const initData = require("./data.js");

// =====================================================
// 3) Listing Model Import
// Roman Urdu: Is model ka use karke hum DB me listings insert karenge
// =====================================================
const listing = require("../models/listing.js");

// =====================================================
// 4) Database Connection URL
// Roman Urdu: Local MongoDB ka database jahan hum data insert karenge
// =====================================================
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// =====================================================
// 5) DB Connection Function — Pehle database connect karna zaroori hai
// =====================================================
main()
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => console.log(err));

// Roman Urdu: Async function jo MongoDB se actual connection banata hai
async function main() {
  await mongoose.connect(MONGO_URL);
}

// =====================================================
// 6) initDB Function — Ye poori database ko seed karta hai
// IMPORTANT:
//  • Ye dummy data lagata hai
//  • Purana data delete karta hai
// =====================================================
const initDB = async () => {
  // Step 1: Purana data sab delete kar do
  // Roman Urdu: Taa-ke hum fresh new dummy data insert kar saken
  await listing.deleteMany({});

  // Step 2: Har object me owner field add karna
  // Roman Urdu: Har listing ka owner fix ID rakha gaya hai seed ke liye
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6924392ff66b5bb67ada76ba",
  }));

  // Step 3: New dummy data insert in database
  await listing.insertMany(initData.data);

  console.log("data was initialized");
};

// =====================================================
// 7) initDB Function Call — Script run hone par auto execute hota hai
// =====================================================
initDB();
