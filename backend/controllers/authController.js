import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import APPError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config.js";
import { sendVerificationEmail } from "../utils/Email.js";
import crypto from "crypto";

export const signUp = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;
  if (!passwordConfirm) {
    return next(new APPError("please confirm your password", 400));
  }
  if (password !== passwordConfirm) {
    return next(new APPError("Passwords do not match", 400));
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return next(new APPError(`Email is already exist`, 400));
  }

  //   console.log(existingUser);
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const userInfo = User({
    username,
    email,
    password,
    password,
    verificationToken,
  });
  await userInfo.save();
  sendVerificationEmail(email, verificationToken);
  res
    .status(201)
    .json(
      "User created successfully!, please check your email to verify your account!"
    );
});

export const verifyEmail = async (req, res, next) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json("Invalid or expired token.");
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token after verification
    await user.save();

    // res.status(200).json("Email verified successfully!");
    res.redirect("https://mern-blog-pt2t.onrender.com/email-verified");
  } catch (error) {
    next(error);
  }
};

export const SignIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new APPError("please provide a valid email and password"));
  }
  const isUserExist = await User.findOne({ email }).select("+password");

  //   const checkPassword = await isUserExist.comparePassword(password);

  if (!isUserExist || !(await isUserExist.comparePassword(password))) {
    return res.status(400).send("Invalid credentials!");
  }

  // if (!checkPassword) {
  //   return res.status(400).json("password is incorrect");
  // }
  const expiresIn = 7 * 24 * 60 * 60;

  const token = jwt.sign({ _id: isUserExist._id }, jwtSecret, {
    expiresIn,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: expiresIn * 1000, // 7 days
  });

  isUserExist.password = undefined;

  res.status(200).json({
    status: "success",
    message: "logged in success!",
    user: isUserExist,
    expiresIn,
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  //1) get user from collection
  const user = await User.findById(req.user._id).select("+password");
  //2) check if POSTED current password is correct
  if (!(await user.comparePassword(req.body.passwordCurrent))) {
    return next(new APPError("your current passowrd is incorrect", 401));
  }
  //3) if so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  //4) log user in , send JWT
  const expiresIn = 7 * 24 * 60 * 60;
  const token = jwt.sign({ _id: user._id }, jwtSecret, {
    expiresIn,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: expiresIn * 1000, // 7 days
  });

  //   user.password = undefined;

  res.status(200).json({
    status: "success",
    message: "password successfully updated!",
    user,
    expiresIn,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  const token = req.headers.cookie;
  const splitToken = token.split("=")[1];
  if (!splitToken) return next(new APPError("Access denied please login", 403));

  //   console.log(splitToken);
  const decoded = jwt.verify(splitToken, jwtSecret);
  // console.log(decoded);

  //check if user still exist
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(
      new APPError(`the user belonging this token does not exist`, 401)
    );
  }
  req.user = currentUser;

  next();
});
