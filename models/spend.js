const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spendSchema = new Schema({
    username: {type: String, required: true },
    description: {type: String, required: true},
    amount: {type: Number, required: true},
}, 
{
    timestamps: true,

})

const Spend = mongoose.model('Spend', spendSchema)
module.exports = Spend;