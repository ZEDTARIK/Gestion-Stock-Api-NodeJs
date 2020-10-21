const router = require('express').Router();
const userController = require('../controllers/UserController');


router.post('/register', userController.registerUser );
router.get('/:id', userController.getOneUser);
router.get('/', userController.getAllusers);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;