const express = require("express");
const cors = require("cors");
const weatherRoute = require("./routes/weather");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/", weatherRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
