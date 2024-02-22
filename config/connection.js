const mongoose = require("mongoose");

const runDB = async () => {
  try {
    // connect to db
    await mongoose.connect("mongodb://localhost/social-network");

    console.log("MongoDB connected");
  } catch (error) {

    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = runDB;
