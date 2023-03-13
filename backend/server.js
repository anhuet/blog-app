const express = require("express");
const dbConenct = require("./config/db/dbConnect");
const { notFound, errorHandler } = require("./middlewares/error/errorHandler");
const userRouter = require("./route/users");

const app = express();

const PORT = process.env.PORT || 5000;
dbConenct();


app.use(express.json());
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT} `));
