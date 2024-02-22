const mongoose = require("mongoose");
const { User, Thought } = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-__v")
      .populate("thoughts", "-__v")
      .populate("friends", "-__v");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const user = await User.findById(userId)
      .select("-__v")
      .populate("thoughts", "-__v")
      .populate("friends", "-__v");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.updateMany({ friends: userId }, { $pull: { friends: userId } });
    await Thought.deleteMany({ username: user.username });
    await User.findByIdAndDelete(userId);

    res.json({ message: "User and associated thoughts deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
