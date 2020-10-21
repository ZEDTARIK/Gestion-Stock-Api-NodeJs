const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllusers);
router.get('/:id', UserController.getOneUser);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.login);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);

module.exports = router;