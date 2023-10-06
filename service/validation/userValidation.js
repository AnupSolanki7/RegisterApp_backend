const { check } = require("express-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/user");

const userLoginValidation = [
  check("email", "Invalid Email")
    .not()
    .notEmpty()
    .isEmail()
    .custom((value, { req }) => {
      if (!value) return false;
      return new Promise((resolve, reject) => {
        UserModel.findOne({
          where: {
            email: req.body.email,
          },
        })
          .then((result) => {
            if (result) {
              resolve(true);
            } else {
              reject(new Error("E-mail not registered"));
            }
          })
          .catch(() => {
            reject(new Error("Internal server error"));
          });
      });
    }),
  check("password", "Invalid password")
    .not()
    .notEmpty()
    .custom((value, { req }) => {
      if (!value) return false;
      return new Promise(async (resolve, reject) => {
        const userData = await UserModel.findOne({
          where: {
            email: req.body.email,
          },
          attributes: ["firstName", "lastName", "email", "password", "role"],
          raw: true,
        });

        if (!userData) {
          return reject(false);
        }

        const isPasswordOk = await bcrypt.compare(
          req.body.password,
          userData.password
        );

        if (isPasswordOk) {
          delete userData.password;
          req.userData = userData;
          resolve(true);
        } else {
          reject(new Error("Invalid password"));
        }
      });
    }),
];

const userRegisterValidation = [
  check("firstName", "Invalid first name")
    .not()
    .notEmpty()
    .isLength({ min: 1 }),
  check("lastName", "Invalid last name").not().notEmpty().isLength({ min: 1 }),
  check("email", "Invalid Email")
    .not()
    .notEmpty()
    .isEmail()
    .custom((value, { req }) => {
      if (!value) return false;
      return new Promise((resolve, reject) => {
        UserModel.findOne({
          where: {
            email: req.body.email,
          },
        })
          .then((result) => {
            if (result) {
              reject(new Error("E-mail already in use"));
            } else {
              resolve(true);
            }
          })
          .catch(() => {
            reject(new Error("Internal server error"));
          });
      });
    }),
  check("password", "Invalid password").not().notEmpty().isLength({ min: 4 }),
];

module.exports = {
  userLoginValidation,
  userRegisterValidation,
};
