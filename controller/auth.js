import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const edata = await User.findOne({ email });
  if (edata) return res.status(403).json("This email is already used");

  const validRegex = /^[^\s@]+@(gmail\.com|email\.com|yahoo\.com)$/;

  try {
    if (validRegex.test(email)) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User({ name, email, password: hash });

      const user = await newUser.save();
      res.status(200).json(user);
    } else {
      res.status(400).json("Invalid email address");
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    if (!user) return res.status(404).json("User hasn't been created");

    const cpassword = await bcrypt.compare(req.body.password, user.password);
    if (!cpassword) return res.status(400).json("Password Incorrect");

    const token = jwt.sign({ id: user._id }, process.env.KEY);

    const { password, createdAt, updatedAt, ...others } = user._doc;

    res
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    console.log(error);
  }
};
