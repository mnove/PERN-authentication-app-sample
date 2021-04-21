const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const keys = require('../config/keys');


//
// REGISTER a new user
//
router.post("/register", async (req, res) => {
  // hashing password
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  console.log(req.body);

  const hashedPasswords = await bcrypt.hash(req.body.password, salt);

  // creating a new user from the user model
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPasswords,
    favoriteColor: req.body.favoriteColor,
  });

  const result = await user.save();

  // separate the password from the the rest
  const { password, ...data } = await result.toJSON();

  // return the data without the password
  res.send(data);
});

module.exports = router;

//
// LOGIN a user
//

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  console.log(req.body);

  // check if user exists
  if (!user) {
    return res.status(404).send({
      message: "User not found.",
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "Wrong password. Try again.",
    });
  }

  const token = jwt.sign({ _id: user.id }, keys.jwt.secret);

  // store the JWT token inside a httpOnly cookie (for security reasons)
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  });

  res.send({
    message: "Login Successful",
  });
});

//
// AUTHENTICATED ONLY USER route
//

router.get("/user", async (req, res) => {
  try {
    // get the cookie
    const cookie = req.cookies["jwt"];

    // verify the jwt token from the cookie
    const claims = jwt.verify(cookie, keys.jwt.secret);

    if (!claims) {
      return res.status(401).send({
        message: "not authenticated",
      });
    }
    const user = await User.findOne({ _id: claims._id });
    const { password, ...data } = await user.toJSON();

    // return the user's data without the password
    res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Not authenticated.",
    });
  }
});

// VERIFY JWT middleware

const verifyJWT = (req, res, next) => {
  // get the cookie with the jwt in it
  const cookie = req.cookies["jwt"];

  // verify the jwt token from the cookie
  jwt.verify(cookie, keys.jwt.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({
        message: "You are not authorized to access this property.",
      });
    } else {
      //decode the JWT and get the _id value
      const userId = decoded._id;

      // attach the userId to the request object (for the next step in the middleware chain)
      req.userId = userId;
      console.log(userId);

      console.log("User Verification Successfull.");
      next();
    }
  });
};

//
// GET Favorite color
//

router.get("/favorite-color", verifyJWT, async (req, res) => {
  const userId = req.userId; // get the userId from the req object

  let userData = await User.findById(userId);
  let favoriteColor = userData.favoriteColor;

  res.send({
    message: favoriteColor,
  });
});

//
// LOGOUT the user
//
router.get("/logout", (req, res) => {
  // to delete the cookie we grab the cookie we want to delete, create an empty cookie and set maxAge to 0.
  // This way the cookie will expire immediately, thus leaving the user without a cookie (i.e. logged-out)
  res.cookie("jwt", "", {
    maxAge: 1, // 1 millisecond
  });

  res.send({
    message: "Logout successfull.",
  });
});
