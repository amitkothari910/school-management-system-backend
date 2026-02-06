const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Subject = sequelize.define("Subject", {
  name: {
    type: DataTypes.STRING, // e.g. "Mathematics"
    allowNull: false,
    unique: true,
  },
});

module.exports = Subject;
