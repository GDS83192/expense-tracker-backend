//Need to review method override and if I need to use that here
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

router.route('/:id').get((req, res) =>{
    Spend.findById(req.params.id)
    .then(spend => res.json(spend))
    .catch(err => res.status(400).json('Error ' + err))
});

router.route('/:id').delete((req, res) => {
    Spend.findByIdAndDelete(req.params.id)
    .then(() => res.json('Spend deleted'))
    .catch(err => res.status(400).json('Error ' + err))
});

router.route('/update/:id').post((req, res) => {
    Spend.findById(req.params.id)
    .then(spend => {
        spend.username = req.body.username;
        spend.description = req.body.description;
        spend.amount = req.body.amount;

        spend.save()
        .then(() => res.json('Spend updated'))
        .catch(err => res.status(400).json('Error' + err));
    });
})

module.exports = router;