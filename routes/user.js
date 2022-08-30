const express = require("express");
const router = express.Router();

// get middleware to check if user is logged in or not
const {checkIfLoggedIn} = require("../utils/customMiddlewares");

// Import needed model
const UserProfile = require('../db/models/userProfile');

router.get('/updateProfile', checkIfLoggedIn, async (req, res) => {
    console.log("In /updateProfile");
    console.log("req.session.userId", req.session.userId);

    let userProfileObj = {
        address: '',
        age: '',
        gender: '',
        work_exp: '',
        present_company: '',
        current_ctc: '',
        employment_status: '',
        available_to_hire: '',
        available_to_freelance:'',
    };
    try {
        let userProfileObjFromTable = await UserProfile.query().findOne({user_id: req.session.userId});

        if (userProfileObjFromTable) {
            userProfileObj = {...userProfileObjFromTable};
        }
    }
    catch (err) {
        console.log(err);
    }
    console.log('userProfileObj', userProfileObj);
    res.render('updateProfile', userProfileObj);
})

router.patch('/updateProfile', checkIfLoggedIn, async (req, res) => {
    console.log(req.body);
    try {
        const updateObj = {
            address: req.body.updateProfileAddress,
            age: req.body.updateProfileAge,
            gender: req.body.updateProfileGender,
            work_exp: req.body.updateProfileWorkExp,
            present_company: req.body.updateProfilePresentCompany,
            current_ctc: req.body.updateProfileCurrentCTC,
            employment_status: req.body.updateProfileEmpStatus,
            available_to_hire: req.body.updateProfileAvailableToHire ? true: false,
            available_to_freelance: req.body.updateProfileAvailableToFreelance ? true : false,
        };

        console.log('req.session.userId', req.session.userId);

        // Update the user profile
        const userProfileRecord = await UserProfile.query()
            .findOne({user_id: req.session.userId});

        console.log('userProfileRecord', userProfileRecord);

        if (!userProfileRecord) {
            await UserProfile
                .query()
                .insert({
                    user_id: req.session.userId,
                    ...updateObj
                })
        }
        else {
            await UserProfile
                    .query()
                    .findOne({user_id: req.session.userId})
                    .patch(updateObj)
        } 
    }
    catch(err) {
        console.log(err);
        return res.status(500).json(err); 
    }

    res.send({
        err: null,
        status: "Updated successfully"
    })
})

module.exports = router;