const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descriptor: {
    type: [Number], // face embedding vector
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);