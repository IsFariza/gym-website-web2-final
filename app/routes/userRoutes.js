const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const verifyRole = require('../middlewares/verifyRole');

router.get('/profile', auth, verifyRole('user', 'admin'), userController.getProfile);
router.put('/profile', auth, verifyRole('user', 'admin'), userController.updateProfile);

module.exports = router;
