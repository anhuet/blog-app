const express = require("express");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  userRegister,
  userLogin,
  getUsers,
  deleteUser,
} = require("../../controllers/users");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/", authMiddleware, getUsers);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
