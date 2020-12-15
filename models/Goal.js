const mongoose = require("mongoose");

const GoalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  
  description: {
    type: String
  },
 
});

module.exports = mongoose.model("goal", GoalSchema);