import express from "express";
import {
  getAllUsers,
  getOne,
  updateUser,
  deleteUser,
  getUserPosts,
} from "../controllers/userController.js";
import {
  SignIn,
  protect,
  signUp,
  updatePassword,
} from "../controllers/authController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.route("/").get(protect, getAllUsers);
router.route("/posts").get(protect, getUserPosts);
router.post("/sign-up", signUp);
router.post("/sign-in", SignIn);

router.route("/:id").get(protect, getOne);
router.post("/update-password", protect, updatePassword);
router.post("/:id", protect, upload.single("photo"), updateUser);
router.delete("/delete/:id", protect, deleteUser);

export default router;
