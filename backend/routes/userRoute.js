const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const { singleUpload } = require('../middlewares/multer');
const {
  login,
  logout,
  register,
  updateProfile
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', singleUpload, register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/profile/update', isAuthenticated, singleUpload, updateProfile);

module.exports = router;

 