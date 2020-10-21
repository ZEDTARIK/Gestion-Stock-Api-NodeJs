const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validations/userValidations');

exports.login = (req, res) => {
    User.findOne({ Email: req.body.Email })
        .then((user) => {
            if (!user) return res.status(400).json({ error: 'User not Found' })
            bcrypt.compare(req.body.Password, user.Password)
                .then(valid => {
                    if (!valid) return res.status(401).json({ error: 'Mot de Pass Incorect !!' });
                    res.status(200).json({
                        UserId: user._id,
                        Token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '1h' }
                        )
                    });
                })
                .catch((error) => res.status(500).send.json({ error }));
        })
        .catch((error) => res.status(500).send.json({ error }));
};

exports.registerUser = async (req, res) => {
    // validations Error
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Check if Email is already in the dataBase
    emailExist = await User.findOne({ Email: req.body.Email });
    if (emailExist) return res.status(400).send('Email is already exist in the Database User');

    // Hash Password
    const slat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, slat);

    const user = new User({
        FullName: req.body.FullName,
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllusers = (req, res) => {
    User.find()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.updateUserById = (req, res) => {
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id },)
        .then(user => res.status(200).json({ message: 'Object Modifié' }))
        .catch(error => res.status(404).json({ error }));
};

exports.deleteUserById = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(user => res.status(200).json({ message: 'Object supprimé' }))
        .catch(error => res.status(404).json({ error }));
};