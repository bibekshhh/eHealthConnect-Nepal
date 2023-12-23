const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, userValidationSchema, validateLogin } = require("../models/User");

const validateMiddleware = require("../middlewares/validate");
const authProtect = require("../middlewares/auth");

authRouter.post(
  "/register",
  [validateMiddleware(userValidationSchema)],
  async (req, res) => {
    try {
      const { email, password, fName, lName } = req.body;

      // check if user already exists
      const doesUserAlreadyExists = await User.findOne({ email });
      if (doesUserAlreadyExists) {
        return res.status(400).send("User already exists!");
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create new user
      const newUser = new User({
        fName,
        lName,
        email,
        password: hashedPassword,
      });

      // save user to database
      const result = await newUser.save();

      // send back response
      return res.status(201).send({ ...result._doc, password: undefined });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrong!");
    }
  }
);

authRouter.post(
  "/login",
  [validateMiddleware(validateLogin)],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // check if user exists
      const doesUserExists = await User.findOne({ email });

      if (!doesUserExists) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // check if password is correct
      const isPasswordCorrect = await bcrypt.compare(
        password,
        doesUserExists.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // generate token
      const token = jwt.sign(
        {
          id: doesUserExists._id,
          email: doesUserExists.email,
          name: doesUserExists.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // send back response
      return res.status(200).send({
        token,
        user: {
          id: doesUserExists._id,
          email: doesUserExists.email,
          fName: doesUserExists.fName,
          lName: doesUserExists.lName,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

authRouter.get("/protected", authProtect, (req, res) => {
  return res.status(200).send("You are authorized!");
});

module.exports = authRouter;
