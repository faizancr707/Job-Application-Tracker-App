const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB, sequelize } = require("./utils/db");
const userRoute = require("./routes/userRoute");
const companyRoute = require("./routes/companyRoute");
const jobRoute = require("./routes/jobRoute");
const applicationRoute = require("./routes/applicationRoute");

dotenv.config({});

// Import models so associations are registered
require("./models/user");
require("./models/company");
require("./models/job");
require("./models/application");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// api routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// start server
const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("MySQL connected successfully");
    // ⬇️ Sync all models (use { force: true } to reset, or { alter: true } to auto-update)
    // await sequelize.sync({ alter: true });
    console.log("All models synced");
    console.log(` Server running at port ${PORT}`);
  } catch (error) {
    console.error("MySQL connection failed:", error);
  }
});
