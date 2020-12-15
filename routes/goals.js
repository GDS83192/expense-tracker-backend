const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Goal = require("../models/Goal");

// @route     GET api/expenses
// @desc      Get all expenses of a user
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(goals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/expenses
// @desc      Add new expense
// @access    Private
router.post(
  "/",
  [
    auth
   
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description} = req.body;

    try {
      const newGoal = new Goal({
        
        description,
        
        
        user: req.user.id
      });

      const goal = await newGoal.save();
      res.json(goal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     PUT api/expenses/:id
// @desc      Update expense
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { description} = req.body;

  // Build expense object
  const goalFields = {};
  
  if (description) goalFields.description = description;


  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) return res.status(404).json({ msg: "Goal not found" });

    // Make sure user owns expense
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { $set: goalFields },
      { new: true }
    );

    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/goals/:id
// @desc      Delete expense
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) return res.status(404).json({ msg: "Goal not found" });

    // Make sure user owns expense
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Goal.findByIdAndRemove(req.params.id);

    res.json({ msg: "Goal removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
