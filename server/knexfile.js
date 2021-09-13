// //Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: process.env.PASSWORD,
      database: "AddItem",
      charset: "utf8",
      insecureAuth: true,
    },
  },
};
