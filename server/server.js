// NPM IMPORTS
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const Middleware = require("./middleware/middleware");
const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(cors());
app.use(helmet());
app.use(Middleware.decodeToken);

// DATABASE INITIALIZATION
main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/authExampleDB");
  console.log("Connection open");
}
app.get("/api/todos", (req, res) => {
  return res.json({
    todos: [
      {
        title: "Task1",
      },
      {
        title: "Task2",
      },
      {
        title: "Task3",
      },
    ],
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}...`);
});
