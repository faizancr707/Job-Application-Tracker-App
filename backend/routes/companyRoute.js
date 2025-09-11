const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');
const { singleUpload } = require('../middlewares/multer');

const router = express.Router();

router.post('/register', isAuthenticated, registerCompany);

router.get('/get', isAuthenticated, getCompany);

router.get('/get/:id', isAuthenticated, getCompanyById);

router.put('/update/:id', isAuthenticated, singleUpload, updateCompany);

router.delete('/delete/:id', isAuthenticated, deleteCompany);

module.exports = router;