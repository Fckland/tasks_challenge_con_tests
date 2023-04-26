const Task = require("../models/task");
const User = require("../models/usuario");

const taskExists = async (req, res, next) => {
  let { name } = req.body;
  name = name.trim().toUpperCase();
  const filter = (await Task.find({ name }));
  if (filter.length>=1) {
    return res.status(400).json({ message: "Task already exists" });
  }
  next();
};

const userOrMailExists = async (req, res, next) => {
  const { name, mail } = req.body;
  const filter1 = (await User.find({ name }));
  const filter2 = (await User.find({ mail }));
  if (filter1.length>=1 || filter2.length>=1) {
    return res.status(400).json({ message: "User or mail already exists" });
  }
  next();
};



module.exports = {
  taskExists,
  userOrMailExists
};
