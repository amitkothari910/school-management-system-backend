const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Class = sequelize.define("Class", {
  name: {
    type: DataTypes.STRING, // e.g. "10A"
    allowNull: false,
    unique: true,
  },
});

module.exports = Class;
