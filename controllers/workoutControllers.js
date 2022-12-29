const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getAllWorkouts = async (req, res) => {

  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "can not get all" });
  }
};

//get one workout
const getOneWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Workout not found" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    res.status(404).json({ msg: "Workout not found" });
  }
  res.status(200).json(workout);
};

//create a workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title){
    emptyFields.push("title");
  }
  if (!load){
    emptyFields.push("load");
  }
  if (!reps){
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "please fill in all the fields ", emptyFields });
  }
  
  try {
    const workout = await Workout.create({
      title,
      reps,
      load,
    });
    res.status(200).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message});
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Workout not found" });
  }

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    res.status(404).json({ msg: "Workout not found" });
  }
  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Workout not found" });
  }

  const workout = await Workout.findOneAndUpdate(
    {
      _id: id,
    },
    {
      ...req.body,
    }
  );

  if (!workout) {
    res.status(404).json({ msg: "Workout not found" });
  }
  res.status(200).json({ msg: "Workout updated" });
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getOneWorkout,
  deleteWorkout,
  updateWorkout,
};
