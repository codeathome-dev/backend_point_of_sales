const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
const auth = require("./routers/auth");
const category = require("./routers/category");
const product = require("./routers/product");
const checkout = require("./routers/checkout");
const dashboard = require("./routers/dashboard");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/api/v1", (req, res) =>
  res.send({ message: "Welcome to api point of sales!" })
);
app.use("/api/v1/users", auth);
app.use("/api/v1/category", category);
app.use("/api/v1/product", product);
app.use("/api/v1/checkout", checkout);
app.use("/api/v1/dashboard", dashboard);

const port = 3000;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
