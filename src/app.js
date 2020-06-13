const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
const Auth = require("./routers/auth");
const Category = require("./routers/category");
const Product = require("./routers/product");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/v1/users", Auth);
app.use("/api/v1/category", Category);
app.use("/api/v1/product", Product);

const port = 3000;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
