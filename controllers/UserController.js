const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validations/userValidations');

exports.registerUser = async (req, res) => {

    // validations Error
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Check if Email is already in the dataBase
    emailExist = await User.findOne({ Email: req.body.Email });
    if (emailExist) return res.status(400).send('Email is already exist in the Database User');

    // Hash Password
    const slat = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(req.body.Password, slat);

    const user = new User({
        FullName: req.body.FullName,
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }

    res.send('Register');
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