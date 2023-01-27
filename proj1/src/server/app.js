var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");

//jwt webtoken
const jwt = require("jsonwebtoken");
const config = require("./database/config/config");

//connect to mongodb
const connectMongoose = require("./database/connect");
const userData = require("./database/model");
connectMongoose();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//mock database
const users = [{ email: "1@2.com", password: "123456", isLogin: false }];
//validator func
const validReq = (req = null, opt = "") => {
  switch (opt) {
    case "update": {
      return req.body && req.body.email && req.body.password;
    }
    case "delete":
      return req.body;
    case "login": {
      // userData.findOne
      return;
    }
    case "checkLogin": {
      return req.body && req.body.Token;
    }
    case "logout": {
      return req.body && req.body.Token;
    }
    default:
      return false;
  }
};

// create
app.post("/addUser", async (req, res) => {
  if (validReq(req, "update")) {
    try {
      const uesrExist = await userData.findOne({ email: req.body.email });
      console.log(uesrExist);
      if (uesrExist != null) {
        res.status(400).json({ message: "user exist", error: "denied" });
        return;
      } else {
        const userInf = new userData({
          email: req.body.email,
          password: req.body.password,
          isLogin: true,
          id: uuidv4(),
        });
        const newUser = await userInf.save();
        if (userInf === newUser) {
          const userToken = jwt.sign({ id: userInf.id }, config.secret);
          res.status(200).json({
            message: "succeed",
            returnToken: { Token: userToken },
          });
          return;
        } else {
          res
            .status(400)
            .json({ message: "add user action failed", error: "denied" });
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
});

//retrieve
app.post("/info", async (req, res) => {
  if (validReq(req, "checkLogin")) {
    try {
      let decoded = jwt.verify(req.body.Token, config.secret);
      const decodedId = decoded.id;
      const checkedUser = await userData.findOne({ id: decodedId });
      if (checkedUser != null) {
        if (checkedUser.isLogin) {
          res
            .status(200)
            .json({ email: checkedUser.email, password: checkedUser.password });
          return;
        }
        res.status(201).json({ message: "already logout", error: "failed" });
        return;
      }
    } catch (error) {
      return res.status(404).json({ error: "failed", message: "token wrong" });
    }
  } else {
    return res.status(404).json({ error: "failed", message: "token invald" });
  }
});
//update
//login
app.post("/login", async (req, res) => {
  if (validReq(req, "update")) {
    try {
      const loginUser = await userData.findOne({ email: req.body.email });
      if (loginUser == null) {
        res.status(404).json({ message: "user not exist", error: "failed" });
        return;
      }
      //user exist email correct
      if (loginUser.password == req.body.password) {
        //password correct
        if (loginUser.isLogin) {
          //if user already log in => return token but not update databse
          let userToken = jwt.sign({ id: loginUser.id }, config.secret);
          res.status(201).json({
            message: "succeed",
            returnToken: { Token: userToken },
          });
          return;
        } else {
          //user not log in before => return token and update database
          const { modifiedCount } = await loginUser.updateOne({
            isLogin: true,
          });
          if (modifiedCount <= 0) {
            res
              .status(400)
              .json({ message: "login action failed", error: "failed" });
            return;
          }
          //succeed action, return token
          let userToken = jwt.sign({ id: loginUser.id }, config.secret);
          res.status(201).json({
            message: "succeed",
            returnToken: { Token: userToken },
          });
          return;
        }
      } else {
        //pw incorrect
        res
          .status(202)
          .json({ message: "password incorrect", error: "failed" });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
});

//logout
app.post("/logout", async (req, res) => {
  if (validReq(req, "logout")) {
    try {
      let decoded = jwt.verify(req.body.Token, config.secret);
      const decodedId = decoded.id;
      const logoutUser = await userData.findOne({ id: decodedId });
      if (logoutUser != null) {
        const { modifiedCount } = await logoutUser.updateOne({
          isLogin: false,
        });
        if (modifiedCount) {
          res.status(200).json({ message: "succeed" });
          return;
        }
        res.status(404).json({ message: "logout failed", error: "failed" });
        return;
      }
      res
        .status(404)
        .json({ message: "not found user to logout", error: "failed" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "No token found", error: "failed" });
    }
  } else {
    res
      .status(404)
      .json({ message: "logout input info wrong", error: "failed" });
    return;
  }
});

//delete

//check user login state
app.post("/checkLogin", async (req, res) => {
  if (validReq(req, "checkLogin")) {
    try {
      let decoded = jwt.verify(req.body.Token, config.secret);
      const decodedId = decoded.id;
      const checkedUser = await userData.findOne({ id: decodedId });
      if (checkedUser != null) {
        if (checkedUser.isLogin) {
          res.status(200).json({ message: "Login" });
          return;
        }
        res.status(201).json({ message: "already logout", error: "failed" });
        return;
      }
    } catch (error) {
      return res.status(404).json({ error: "failed", message: "token wrong" });
    }
  } else {
    return res.status(404).json({ error: "failed", message: "token invald" });
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
