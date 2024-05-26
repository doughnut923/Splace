const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
var cors = require("cors")
const port = process.env.PORT || 5000;
const app = express();

const userRoute = require("./routes/User.js");
const locationRoute = require("./routes/Location.js");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(cors());


connectDB();

app.use("/user", userRoute);
app.use("/location", locationRoute);

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
