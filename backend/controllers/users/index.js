const expressHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");
const validateMongodbId = require("../../utils/validateMongodbID");

const userRegister = expressHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req?.body?.email });

  if (userExists) throw new Error("User already exists");

  const user = await User.create({
    firstName: req?.body?.firstName,
    lastName: req?.body?.lastName,
    email: req?.body?.email,
    password: req?.body?.password,
  });
  res.json(user);
});

const userLogin = expressHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  if (userFound?.isBlocked)
    throw new Error("Access Denied You have been blocked");
  if (userFound && (await userFound.isPasswordMatched(password))) {
    console.log(userFound);

    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
      isVerified: userFound?.isAccountVerified,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

const getUsers = expressHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = expressHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const deleteUser = await User.findByIdAndDelete(id);
  res.json(deleteUser);
});

module.exports = { userRegister, userLogin, getUsers, deleteUser };
