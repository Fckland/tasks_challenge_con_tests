/* eslint-disable global-require */
const express = require("express");
const cors = require("cors");
require('dotenv').config();

const {connectDB, disconnectDB} = require("../database/config");


class Server {
  constructor() {
    this.app = express();

    this.path = {
        login: "/login",
        tasks: "/tasks",
        tiendaNube: "/tiendanube",
        users: "/users",
      };

    this.conectarDB("");
    // Middlewares
    this.middlewares();

    // Rutas de la aplicacion
    this.routes();
  }

  async conectarDB() {
    await connectDB();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json({ limit: "50mb" }));
  }

  routes() {
    this.app.use(this.path.login, require("../routes/login"));
    this.app.use(this.path.tasks, require("../routes/tasks"));
    this.app.use(this.path.tiendaNube, require("../routes/tiendaNube"));
    this.app.use(this.path.users, require("../routes/users"));
  }
  listen() {
    this.app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
  }
  async desconectarDB() {
    await disconnectDB();
  }
}

module.exports = Server;
