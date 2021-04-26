const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pool = require("pg").Pool;
const keys = require("../config/keys");

const pool = new Pool(keys.postgresDb);
//
// REGISTER a new user
//
router.post("/register", async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  const { name } = req.body;
  const { favoriteColor } = req.body;

  try {
    const checkIfUserExists = await pool.query(
      "SELECT email FROM users WHERE email = $1;",
      [email]
    );

    if (checkIfUserExists.rows == 0) {
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      console.log(req.body);

      const hashedPassword = await bcrypt.hash(password, salt);

      //  pool.on('connect', connected => {
      //    console.log(connected)
      //  })

      //  pool.on('acquire', connected => {
      //   console.log(connected)
      // })

      const newUser = await pool.query(
        "INSERT INTO users (email, password, name) VALUES ($1, $2, $3)",
        [email, hashedPassword, name]
      );

      // Insert the fav color to the favorite_color table
      // (after retrieving the foreign key)
      const newColor = await pool.query(
        `INSERT INTO favorite_color (user_id, favorite_color) VALUES 
        ( (SELECT id from users WHERE email = $1), $2)`,
        [email, favoriteColor]
      );
      res.status(201).send({
        message: "User created successfully.",
      });
    } else {
      return res.status(404).send({
        message: "Email already in use. Choose another one or login instead.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

//
// LOGIN a user
//

router.post("/login", async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  const queryResult = await pool.query(
    "SELECT id, email, password FROM users WHERE email = $1;",
    [email]
  );

  if (queryResult.rows == 0) {
    return res.status(404).send({
      message: "Wrong email or password.",
    });
  } else {
    // if user is found
    const userData = queryResult.rows[0];
    // check password
    await bcrypt.compare(password, userData.password, (err, response) => {
      if (response) {
        // if password matches sign with JWT and return success message
        const token = jwt.sign({ _id: userData.id }, keys.jwt.secret);
        // store the JWT token inside a httpOnly cookie (for XSS security reasons)
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
        });
        res.send({
          message: "Login successfull.",
        });
      } else {
        // if password does not matches return 404 and error
        if (err) {
          // if bcrypt produces an error, log it, otherwise keep going
          console.log(err);
        }
        res.status(404).send({
          message: "Wrong email or password.",
        });
      }
    });
  }
});

//
// AUTHENTICATED ONLY USER route
//

// router.get("/user", async (req, res) => {
//   try {
//     // get the cookie
//     const cookie = req.cookies["jwt"];

//     // verify the jwt token from the cookie
//     const claims = jwt.verify(cookie, keys.jwt.secret);

//     if (!claims) {
//       return res.status(401).send({
//         message: "not authenticated",
//       });
//     }

//     const queryResult = await pool.query(
//       "SELECT * FROM users WHERE id = $1;",
//       [claims._id]
//     );

//     const user = await User.findOne({ _id: claims._id });
//     const { password, ...data } = await user.toJSON();

//     // return the user's data without the password
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send({
//       message: "Not authenticated.",
//     });
//   }
// });

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
      console.log("User Verification Successfull.");
      next();
    }
  });
};

//
// GET User Name
//

router.get("/user", verifyJWT, async (req, res) => {
  const userId = req.userId; // get the userId from the req object

  try {
    const queryResult = await pool.query(
      "SELECT name FROM users WHERE id = $1;",
      [userId]
    );

    let userName = queryResult.rows[0].name;
    console.log(userName);

    res.send({
      name: userName,
    });
  } catch (error) {
    console.log("Error Message: " + error.message, "\n", "Hint: " + error.hint);
    res.status(400).send({
      message: "Error",
    });
  }
});

//
// GET Favorite color
//

router.get("/favorite-color", verifyJWT, async (req, res) => {
  const userId = req.userId; // get the userId from the req object

  try {
    const queryResult = await pool.query(
      "SELECT favorite_color FROM favorite_color WHERE user_id = $1;",
      [userId]
    );

    let favoriteColor = queryResult.rows[0].favorite_color;

    res.send({
      message: favoriteColor,
    });
  } catch (error) {
    console.log("Error Message: " + error.message, "\n", "Hint: " + error.hint);
    res.status(400).send({
      message: "Error",
    });
  }
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
