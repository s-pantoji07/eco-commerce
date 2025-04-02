const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  console.log(`MongoDB URI: ${process.env.MONGO_URI}`); // Log the MONGO_URI for debugging

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 