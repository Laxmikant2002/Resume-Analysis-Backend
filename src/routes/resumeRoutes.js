const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/enrich', authMiddleware, resumeController.enrichResume);
router.post('/search', authMiddleware, resumeController.searchResume);

module.exports = router;