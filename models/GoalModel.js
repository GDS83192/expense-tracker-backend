const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  goalText: {
    type: String,
    trim: true, //to trim all the whitespaces
    // required: [true, "Please add a goal"], //it will show this mssg when text would be empty
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    //default's value will kick in if there no date would be specified
  },
});

module.exports = mongoose.model("Goal",GoalSchema);
//here we are expoting Transaction mdoel along with TransactionSchema schema
