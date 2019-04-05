require("dotenv").config();

const express = require("express");
// const cors = require("cors");
const sequelize = require("./config/database");
// const userRoute = require("./routes/api");
const app = express();
// app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;

sequelize
    .sync({
        force: false
    })
    .then(result => {
        app.listen(PORT, () => console.log("Started on PORT") + PORT)
    })
    .catch(err => console.log(err));