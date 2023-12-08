const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/Error")

app.use(express.json())
app.use(cookieParser())

// Route imports
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")

app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;