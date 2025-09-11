

const express = require("express");
const isAuth = require('../middlewares/isAuth');
const { getAdminJobs, getAllJobs, getJobById, postJob } = require('../controllers/jobController');

const router = express.Router();


router.post('/post', isAuth, postJob);// Post a new job
router.get('/get', isAuth, getAllJobs);// Get all jobs
router.get('/getadminjobs', isAuth, getAdminJobs);// Get all jobs posted by the admin/company
router.get('/get/:id', isAuth, getJobById);// Get a single job by ID

module.exports = router;