const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/', authController.onSlashGet);


router.get('/login', authController.onLoginGet);

router.post('/login', authController.onLoginPost);


router.get('/signUp', authController.onSignUpGet);

router.post('/signUp', authController.onSignUpPost);


router.get('/verifyEmailSmsOtp/:id', authController.onVerifyEmailSmsOtpGet);

router.post('/verifyEmailSmsOtp', authController.onVerifyEmailSmsOtpPost);


router.get('/logout', authController.onLogoutGet);

module.exports = router;

