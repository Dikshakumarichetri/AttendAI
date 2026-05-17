

require('dotenv').config();


  const mongoose = require('mongoose');
  const uri = process.env.CONNECTION_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
