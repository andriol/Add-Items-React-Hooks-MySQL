const express = require("express");
const app = express();
const cors = require("cors");
const itemRouter = require("./routes/item-route");
require("dotenv").config();

const port = process.env.PORT || 8081;

app.use(cors());

app.use(express.json());
app.use("/", itemRouter);
//app.use("/:id", itemRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
