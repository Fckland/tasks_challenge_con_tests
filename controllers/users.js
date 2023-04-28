const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/usuario");

// GET /users: Retrieve a list of all users. The list should be returned in JSON format.
const getUsers = async (req, res) => {
  const { consulta } = req.params;
  const [total, usuarios] = await Promise.all([
    // Cuenta cuantos datos guardados hay
    User.countDocuments(consulta),
    // Filtra segun el query, con skip dice desde donde y limit dice cuantos
    User.find(consulta)
      .skip(Number(0))
      .limit(Number(User.countDocuments(consulta))),
  ]);

  res.json({
    total,
    usuarios,
  });
};

// GET /users/:id: Retrieve a single user by ID. The user should be returned in JSON format.
const getUserId = async (req, res) => {
  const id = req.query;
  const user = await User.findOne(id)

  res.json({
    user
  });
}

// POST /users: Create a new user. The request body should contain the user details in JSON format.
const postUsers = async (req, res) => {
  const { name, mail, password } = req.body;

  const newUser = new User({ name, mail, password });

  if (password) {
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password, salt);
  }

  console.log(newUser);

  await newUser.save();

  res.json({
    newUser,
  });

};

// PUT /users/:id: Update a single user by ID. The request body should contain the updated user details in JSON format.


const putUsers = async (req = request, res = response) => {
  let _id = req.params.id;

  try {
    
    const { name, mail, password} = req.body;
    console.log(req.body)
    console.log(req.body.name,req.body.mail,req.body.password)

    let user = await User.findOne({_id});
  
    name!=user.name ? (await User.findByIdAndUpdate({_id},{name})) : "";
    mail!=user.mail ? (await User.findByIdAndUpdate({_id},{mail})) : "";
    if (password) {
      const salt = bcryptjs.genSaltSync();
      const passwordEncrypted = bcryptjs.hashSync(password, salt);
      password!=user.password ? (await User.findByIdAndUpdate({_id},{password:passwordEncrypted})) : "";
    }
  
    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    
  }
};

// DELETE /users/:id: Delete a single user by ID.
const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const borrar = await User.findByIdAndDelete(id);
  res.json(borrar);
};

module.exports = {
  getUsers,
  getUserId,
  postUsers,
  putUsers,
  deleteUsers,
};
