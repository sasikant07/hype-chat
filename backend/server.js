const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { dbConnect } = require("./utils/db");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`Server running on port ${port}`));
