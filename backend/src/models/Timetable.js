const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Timetable = sequelize.define("Timetable", {
  day: {
    type: DataTypes.STRING, // Monday, Tuesday
    allowNull: false,
  },
  startTime: {
    type: DataTypes.STRING, // 09:00
    allowNull: false,
  },
  endTime: {
    type: DataTypes.STRING, // 09:45
    allowNull: false,
  },
});

module.exports = Timetable;
