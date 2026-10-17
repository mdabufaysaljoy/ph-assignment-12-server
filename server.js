const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

//? middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//? routers
const userRouter = require("./routes/user.route");
const assetRouter = require("./routes/asset.route");

mongoose
  .connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
  .then(() => {
    console.log("mongodb database connection successful...");
  })
  .catch((err) => {
    console.log("couldn't connect to the database ", err);
  });

app.get("/", (req, res) => {
  res.send("server is running...");
});
app.post("/jwt", async (req, res) => {
  try {
    const token = await jwt.sign(req.body, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(501).send({ message: "jwt not created or send" });
  }
});
app.use("/api/user", userRouter);
app.use("/api/asset", assetRouter);

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
