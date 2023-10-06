const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const userData = req.userData;
  const token = jwt.sign(userData, "register_app");

  return res.status(200).send({
    success: true,
    message: "Login Successfully",
    data: { ...userData, token },
  });
};

module.exports = userLogin;
