const express = require("express");
const router = express.Router();

const checkIfLoggedIn = require("../utils/checkIfLoggedIn");

router.get('/updateProfile', checkIfLoggedIn, (req, res) => {
    res.render('updateProfile');
})

router.post('/updateProfile', checkIfLoggedIn, (req, res) => {
    console.log(req.body);
    res.render('updateProfile');
})

module.exports = router;