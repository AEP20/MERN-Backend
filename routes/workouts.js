const express = require("express");
const router = express.Router();
const { createWorkout, getAllWorkouts, getOneWorkout, deleteWorkout, updateWorkout} = require("../controllers/workoutControllers");


// get all workouts
router.get ("/", getAllWorkouts);

// get one workout
router.get ("/:id", getOneWorkout);

// create a workout
router.post ("/", createWorkout);

// update a workout

router.patch ("/:id", updateWorkout);
// delete a workout

router.delete ("/:id", deleteWorkout);

module.exports = router;