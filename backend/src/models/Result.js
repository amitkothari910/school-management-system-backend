const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Result = sequelize.define("Result", {
  marksObtained: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxMarks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Result;
