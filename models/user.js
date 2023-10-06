const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const bcrypt = require("bcrypt");
require("dotenv").config();

const UserModel = sequelize.define(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      set(password) {
        const hash = bcrypt.hashSync(password, Number(process.env.SALT));
        this.setDataValue("password", hash);
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["customer", "admin"],
      defaultValue: "customer",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
);

module.exports = UserModel;
