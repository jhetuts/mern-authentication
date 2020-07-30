const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const { notFound, errorHandler } = require("./middlewares");
const router = require("./api/users");

mongoose
  .connect(process.env.MONGODB_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(
  cors({
    origin: process.env.URL_ORIGIN,
  })
);

app.use(passport.initialize());

require("./config/passport")(passport);

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: `Available api:
    - /api/auth/register
    - /api/auth/register`,
  });
});

app.use("/api/auth", router);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Listening to por ${port}`);
});
