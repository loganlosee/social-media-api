const mongoose = require("mongoose");
const { User } = require("../models");

const addFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      error: "Invalid userId",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(friendId)) {
    return res.status(400).json({
      error: "Invalid friendId",
    });
  }

  if (userId === friendId) {
    return res
      .status(400)
      .json({ error: "You cannot add yourself as a friend" });
  }

  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = await User.findById(userId);
  if (user.friends.includes(friendId)) {
    return res.status(400).json({
      error: "You already have this friend",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(friendId)) {
    return res.status(400).json({ error: "Invalid friendId" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  // Check if the user exists
  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addFriend,
  removeFriend,
};