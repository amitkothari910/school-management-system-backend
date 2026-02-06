const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Exam = sequelize.define("Exam", {
  name: {
    type: DataTypes.STRING, // Midterm, Final
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Exam;
