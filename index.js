require("dotenv").config({
  path: ".env",
});

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

app.use("/", require("./src/routers"));
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "backend is runing well",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App runing on port ${PORT}`);
});
