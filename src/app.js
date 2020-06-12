const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const Category = require("./routers/category");
const Auth = require("./routers/auth");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/v1/category", Category);
app.use("/api/v1/users", Auth);

const port = 3000;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
