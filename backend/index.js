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

const allowedOrigins = process.env.BASE_URL 
  ? process.env.BASE_URL.split(',').map(origin => origin.trim())
  : "*";

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoute);

app.listen(process.env.PORT,()=>{
  console.log("backend running");
});