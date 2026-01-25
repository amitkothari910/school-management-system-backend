require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

// import models
require("./models/User");

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database sync failed:", error);
  });
