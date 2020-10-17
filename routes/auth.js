const router = require('express').Router();
const User = require('../models/User');
const { registerValidation } = require('../validations/userValidations');
// Api for Register
router.post('/register', async (req, res) => {

    const user = new User({
        FullName: req.body.FullName,
        UserName: req.body.UserName,
        Email: req.body.Email
    });

    //validate User Input 

    const { error } = registerValidation(user);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        //const savedUser = await user.save();
        res.send('OK');
    } catch (error) {
        res.status(400).send(error);
    }

    res.send('Register');
});

module.exports = router;