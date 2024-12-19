require("dotenv").config();
const express = require("express");
const connectMongo = require("./config/mongodb");
const userRouter = require("./routers/userRouter");

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongo();

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}/`);
});
