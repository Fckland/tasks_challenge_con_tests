/* eslint-disable global-require */
const express = require("express");
const cors = require("cors");
require('dotenv').config();


const { urlencoded } = require("express");



const corsOptions = {
  origin: "*", // Reemplaza con el dominio que deseas permitir o usa "*" para permitir todos los dominios.
  allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Agrega o elimina los encabezados permitidos según lo que necesites.
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Personaliza los métodos permitidos.
};

const {connectDB, disconnectDB} = require("../database/config");


class Server {
  constructor() {
    this.app = express();


    this.mainPath = "/";
    this.endpoints = [
      "users",
      "categories",
      "products",
      "auth/tiendanube",
      "accessData",
      "offers",
      "frames",
      "interactions",
      "interactions/indicators",
      "webhooks/tiendanube",
      "scripts/tiendanube",
      "orders",
    ];
    this.path = {
        login: "/login",
        tasks: "/tasks",
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
    this.app.use(cors(corsOptions));
    this.app.use((req, res, next) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); // O usa 'cross-origin' si es necesario.
      next();
    });
    // Lectura y parseo del body
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(urlencoded({ extended: true, limit: "50mb" }));
    // Directorio publico
    this.app.use(express.static("client/public"));
    // Manejo de views con handlebars
    this.app.set("view engine", "hbs");
  }

  routes() {
    this.app.use(this.path.login, require("../routes/login"));
    this.app.use(this.path.tasks, require("../routes/tasks"));
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
