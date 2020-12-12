//Here we won't use module.exports i.e export default in ES6 as there would be
//many fucntions to export and these func we will destuct themin routes to
//get use of it
const Goal = require("../models/GoalModel");

// @desc    Get all transactions
// @route   GET /ap1/v1/transactions
// @acess   Pubic
exports.getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find(); //it will fetch all the goals
    return res.status(200).json({
      success: true,
      count: goals.length, //count will store the no. of transaction in the reponses
      data: goals, //actual trasactions will be stored here in data
    });
  } catch (error) {
    return res.status(500).json({
      // 500 reponse means server error
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add transaction
// @route   POST /ap1/v1/transactions
// @acess   Pubic
//It will get the data from the Client
exports.addGoal = async (req, res, next) => {
  try {
    const { goalText } = req.body;
    //text and amount from the client

    const goal = await Goal.create(req.body);
    //it will insert the transaction into database while getting created in client side
    //req.body will accept only text and amount coz in the schema what we have mentioned

    return res.status(201).json({
      //201: when something's got created and is sucessful
      success: true,
      data: goal,
    });
  } catch (error) {
    if (error.name === "ValidationErroror") {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        // 400: when client sent a wrong value
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        // 500 reponse means server error
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /ap1/v1/transactions/:id -->here id is optional parameter
// @acess   Pubic
exports.deleteGoals = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);
    //we want it to find it by id so that we can delete that particular one

    if (!goal) {
      //i.e if no transacction found
      return res.status(404).json({
        success: false,
        error: "No goal",
      });
    }

    await goal.remove();
    //it will remove the transaction(resource)

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {}
};
