const { User, UserAdd } = require("../models/User");


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAddedUsers = async (req, res) => {
  try {
    const users = await UserAdd.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAddedUsersById = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await UserAdd.findById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newUser = new UserAdd({ name, email, phone });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedUser = await UserAdd.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    res.status(200).json({message:updatedUser});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await UserAdd.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, addUser, updateUser, deleteUser,getAddedUsers,getAddedUsersById };
