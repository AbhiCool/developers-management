function checkIfLoggedIn(req, res, next) {
    console.log('req.session.userId in checkIfLoggedIn', req.session.userId);
    if (req.session.userId)
        return next();

    res.redirect('/login');
}


function checkIfDeleteMethodIsAllowed(req, res, next) {
    console.log("In checkIfDeleteMethodIsAllowed");
    console.log("req.method", req.method);
    console.log("req.session.isAdmin", req.isAdmin);

    if (req.method === 'DELETE' && !req.session.isAdmin) {
        return res.status(405).send("Delete method not allowed");
    }
    next();
}

function checkIfAdmin(req, res, next) {
    console.log("In checkIfAdmin");
    if (!req.session.isAdmin) {
        return res.status(403).send("Not allowed");
    }
    next();
}
module.exports = {
    checkIfLoggedIn,
    checkIfDeleteMethodIsAllowed,
    checkIfAdmin
};