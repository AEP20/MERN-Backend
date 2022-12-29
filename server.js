const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set('strictQuery', true);

// express app
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "welcome to the api" });
});

// middleware
//cors 
app.use(cors());

app.use(express.json());
//routes
app.use("/api/workouts", workoutRoutes)

// connect to db , if can not connect, throw error else log success
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => 
    app.listen(process.env.PORT, () => {
        console.log(`connected to db, server is running on port ${process.env.PORT}`);
      })  
    )
    .catch((err) => console.log(err));


// listen for requests
