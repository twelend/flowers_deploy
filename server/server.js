require("dotenv").config();
const express = require("express");
var cors = require("cors");
const flowerRouter = require("./routes/flower.routes");
const userRouter = require("./routes/user.route");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/flowers", flowerRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 4040;

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.warn(error);
  }
};

start();
