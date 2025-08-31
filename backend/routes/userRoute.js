const express = require('express');
const router = express.Router();

// Middlewares
const { singleUpload } = require('../middlewares/multer');
const isAuth = require('../middlewares/isAuth');

// Controllers
const {
  register,
  login,
  logout,
  updateProfile,
} = require('../controllers/userController');

// Routes
router.post('/signup', singleUpload, register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/profile/update', isAuth, singleUpload, updateProfile);

module.exports = router;