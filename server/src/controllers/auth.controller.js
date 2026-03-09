import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenBlackListModel from "../models/blackList.model.js";


/**
 * @route POST /api/auth/register
 * @description Register new user
 * @access Public
 */

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username,email and password",
      });
    }
    const isUserExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExists) {
      return res.status(400).json({
        message: "account already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "user register successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("error while register user", error);
  }
};

/**
 * @route POST /api/auth/login
 * @description login user
 * @access Public
 */

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "User login successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error while login user", error);
  }
};

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access Public
 */

const logoutUser = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    await tokenBlackListModel.create({ token });
  }
  res.status(200).json({
    message: "user loggout successfully",
  });
};

export default { registerUser, userLogin ,logoutUser};
