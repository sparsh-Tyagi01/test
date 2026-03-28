const express = require("express");
const { connectMongoDb } = require('./utils/connect');
const dotenv = require('dotenv');
const cors = require("cors")
const userRoute = require("./routes/user")

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not defined");
  process.exit(1);
}

connectMongoDb(process.env.MONGO_URI);

const app = express();

app.use(cors({
  origin: process.env.BASE_URL || "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoute);

app.listen(process.env.PORT,()=>{
  console.log("backend running");
});