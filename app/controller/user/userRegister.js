const UserModel = require("../../../models/user");

const userRegister = async (req, res) => {
  const userData = req.body;
  try {
    UserModel.create(userData)
      .then((result) => {
        res.send({
          success: true,
          message: "User Register Successfully",
          data: result,
        });
      })
      .catch((error) => {
        res.send({
          success: false,
          message: "User Registration failed",
          data: error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error, while try to add new user",
    });
  }
};

module.exports = userRegister;
