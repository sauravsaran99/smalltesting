const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
const port = process.env.PORT || 8083;
const signupController = require("./controllers/signup.controller");
const loginController = require("./controllers/login.controller");
const adminController = require("./controllers/admin.controller");
app.get('/',(req, res) => {

  return res.send('Welcome to backend server');

})
app.use("/signup", signupController);
app.use("/login", loginController);
app.use("/users", adminController);
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://kritika123:kritika123@cluster0.neydppf.mongodb.net/?retryWrites=true&w=majority");
  } catch (err) {
    console.log(err.message);
  }
};


app.listen(port, async () => {
  try {
    await connect();
    console.log("listening on port " + port);
  } catch (err) {
    console.log(err.message);
  }
});
