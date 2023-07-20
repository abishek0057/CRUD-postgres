const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const employeRoute = require("./routes/employeeRoute");

app.use("/employee", employeRoute);

app.get("/", (req, res) => {
  res.send("Wellcome to CRUD opertion in Postgres");
});

app.listen(5555, () => {
  console.log("running...");
});
