

const express = require('express');
const isAuth = require('../middlewares/isAuth');
const {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} = require('../controllers/applicationController');

const router = express.Router();


router.post('/apply/:id', isAuth, applyJob);

router.get('/get', isAuth, getAppliedJobs);

router.get('/:id/applicants', isAuth, getApplicants);

router.patch('/status/:id', isAuth, updateStatus);

module.exports = router;
