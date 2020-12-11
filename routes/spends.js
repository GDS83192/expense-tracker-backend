const router = require('express').Router();
let Spend = require('../models/spend');

router.route('/').get((req, res) => {
    Spend.find()
    .then(spends => res.json(spends))
    .catch(err => res.status(400).json('Error ' + err));
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description
    const amount = Number(req.body.amount);

    const newSpend = new Spend({
        username,
        description,
        amount
    });

    newSpend.save()
    .then(() => res.json('Spend added'))
    .catch(err => res.status(400).json('Error ' + err))
});

module.exports = router;