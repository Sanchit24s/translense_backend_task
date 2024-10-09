const express = require("express");
const connectDB = require("./config/dbConfig");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require('path');
const Routes = require("./routes/index");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/image', express.static(path.join('uploads')));

app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello" });
});

// Routes
app.use(Routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
