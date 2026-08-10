const express = require('express');
const router = express.Router();
const MedicalController = require('../controllers/MedicalController');

const mockAuth = (req, res, next) => {
    req.user = { id: 'dr-house' };
    next();
};

router.post('/consultations/finish', mockAuth, MedicalController.finishConsultation);

module.exports = router;
