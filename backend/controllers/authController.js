const userModel = require("../models/authModel");
const formidable = require("formidable");
const validator = require("validator");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    let { userName, email, password, confirmPassword } = fields;
    let { image } = files;

    userName = userName[0];
    email = email[0];
    password = password[0];
    confirmPassword = confirmPassword[0];

    const error = [];

    if (!userName) {
      error.push("Please provide your user name");
    }
    if (!email) {
      error.push("Please provide your email");
    }
    if (email && !validator.isEmail(email)) {
      error.push("Please provide a valid email");
    }
    if (!password) {
      error.push("Please provide your password");
    }
    if (!confirmPassword) {
      error.push("Please provide your confirm password");
    }
    if (password && confirmPassword && password !== confirmPassword) {
      error.push("Password and Confirm Password doesn't match");
    }
    if (password && password.length < 6) {
      error.push("Password must be six and above character");
    }
    if (Object.keys(files).length === 0) {
      error.push("Please provide your image");
    }

    if (error.length > 0) {
      res.status(400).json({ error: { errorMessage: error } });
    } else {
      const getImageName = files.image[0].originalFilename;
      const newImagename = files.image[0].newFilename + getImageName;
      files.image[0].newFilename = newImagename;

      const newPath = path.join(
        __dirname +
          `../../../frontend/public/images/${files.image[0].newFilename}`
      ); // saving image in the frontend public folder

      try {
        const checkUser = await userModel.findOne({ email });

        if (checkUser) {
          res
            .status(400)
            .json({ error: { errorMessage: ["Email already exists"] } });
        } else {
          fs.copyFile(files.image[0].filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await userModel.create({
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                image: files.image[0].newFilename,
              });

              const token = jwt.sign(
                {
                  id: userCreate._id,
                  email: userCreate.email,
                  userName: userCreate.userName,
                  image: userCreate.image,
                  registerTime: userCreate.createdAt,
                },
                process.env.SECRET,
                {
                  expiresIn: process.env.TOKEN_EXP,
                }
              );

              const options = {
                expires: new Date(
                  Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                ),
              };

              res.status(201).cookie("authToken", token, options).json({
                successMessage: "You are registered successfully",
                token,
              });
            } else {
              res.status(500).json({ error: { errorMessage: error } });
            }
          });
        }
      } catch (error) {
        res.status(500).json({ error: { errorMessage: error } });
      }
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const error = [];

  if (!email) {
    error.push("Please provide your email");
  }

  if (!password) {
    error.push("Please provide your password");
  }

  if (email && !validator.isEmail(email)) {
    error.push("Please provide a valid email");
  }

  if (error.length > 0) {
    res.status(400).json({ error: { errorMessage: error } });
  } else {
    try {
      const checkUser = await userModel.findOne({ email }).select("+password");

      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );

        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.userName,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            process.env.SECRET,
            {
              expiresIn: process.env.TOKEN_EXP,
            }
          );

          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
            ),
          };

          res.status(201).cookie("authToken", token, options).json({
            successMessage: "You are logged in successfully",
            token,
          });
        } else {
          res.status(401).json({
            error: { errorMessage: ["Email or Password doesn't match"] },
          });
        }
      } else {
        res.status(400).json({
          error: { errorMessage: ["Email not found. Please Register"] },
        });
      }
    } catch (error) {
      res.status(500).json({ error: { errorMessage: error } });
    }
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).cookie("authToken", "").json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: { errorMessage: error } });
  }
};

module.exports = { userRegister, login, logout };
