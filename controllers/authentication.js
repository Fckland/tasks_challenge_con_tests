const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/usuario");
const generateJWT = require("../helpers/jwt_generate");

const authentication = async (req = request, res = response) => {
  const { mail, password } = req.body;

  const user = await User.findOne({ mail });
  if (!user) {
    return res.status(400).json({
      msg: "Usuario no encontrado",
    });
  }

  const userPassword = bcrypt.compareSync(password, user.password);
  if (!userPassword) {
    return res.status(400).json({
      msg: "Contraseña incorrecta",
    });
  }

  const token = await generateJWT(user._id);

  res.json({
    msg: "Por ahora funciona",
    token,
    user: user._id,
  });
};

module.exports = authentication;
