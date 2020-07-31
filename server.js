const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

require("dotenv").config();

const { notFound } = require("./src/middlewares/");
const router = require("./src/api/users");

mongoose
  .connect(process.env.MONGODB_URI_PROD, {
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

require("./src/config/passport")(passport);

app.use(helmet());
app.use(express.json());

app.use("/api/auth", router);
app.use(notFound);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Listening to por ${port}`);
});
