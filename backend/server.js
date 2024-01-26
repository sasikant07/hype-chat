const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { dbConnect } = require("./utils/db");
const authRouter = require("./routes/authRoute");

// dotenv.config({
//   path: "backend/config/config.env"
// })

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/messenger", authRouter);

const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`Server running on port ${port}`));
