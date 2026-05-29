const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { name, descriptor } = req.body;

    if (!name || !descriptor) {
      return res.status(400).json({ message: "Missing name or descriptor" });
    }

    const user = await User.create({
      name,
      descriptor,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser };