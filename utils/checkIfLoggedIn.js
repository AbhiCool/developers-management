function checkIfLoggedIn(req, res, next) {
    console.log('req.session.userId in checkIfLoggedIn', req.session.userId);
    if (req.session.userId)
        return next();

    res.redirect('/login');
}

module.exports = checkIfLoggedIn;