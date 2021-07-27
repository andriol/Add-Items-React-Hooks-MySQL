const express = require("express");
const app = express();
const itemRouter = require("./routes/item-route");
require("dotenv").config();

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use("/", itemRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});