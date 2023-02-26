const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnection = require("../database/config");

require("../database/asociations");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      users: "/api/users",
      search: "/api/search",
    };

    this.conectDB();
    this.middlewares();
    this.routes();
  }

  async conectDB() {
    try {
      await dbConnection.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static("public"));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor conectado en el puerto ", this.port);
    });
  }
}

module.exports = Server;
