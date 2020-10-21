const router = require('express').Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');

router.post('/login', UserController.login);
router.post('/register', UserController.registerUser);

router.get('/', auth, UserController.getAllusers);
router.get('/:id', auth, UserController.getOneUser);
router.put('/:id', auth, UserController.updateUserById);
router.delete('/:id', auth, UserController.deleteUserById);

module.exports = router;