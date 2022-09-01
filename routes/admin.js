const express = require("express");

const UserProfile = require("../db/models/userProfile");
const Users = require("../db/models/users");

const upload = require("../utils/multerSetup");

const router = express.Router();

const {checkIfAdmin} = require("../utils/customMiddlewares");

router.get('/', checkIfAdmin, async (req, res) => {
    try {
        const usersArray = await Users.query()
                                .withGraphFetched('userProfile')
                                .where('users.isAdmin', false)
                                .orWhere('users.user_id', req.session.userId)

        console.log('usersArray', usersArray);

        res.render('adminListView', {usersArray});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get('/:userId', checkIfAdmin, async (req, res) => {

    const userId = req.params.userId;
    try {
        let userProfileObj = {
            present_company: '',
            current_ctc: '',
            employment_status: '',
            available_to_hire: '',
            available_to_freelance:'',
            company_applied_for: ''
        };

        try {
            let userProfileObjFromTable = await UserProfile.query()
                                            .select('present_company', 'current_ctc', 
                                            'employment_status', 'available_to_hire',
                                            'available_to_freelance', 'company_applied_for')    
                                            .findOne({user_id: userId});
    
            if (userProfileObjFromTable) {
                userProfileObj = {...userProfileObj, ...userProfileObjFromTable};
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(userProfileObj);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.delete('/', checkIfAdmin, async  (req, res) => {
    console.log('req.body', req.body);

    const {userId} = req.body;

    
    try {

        const checkUserIDAllowedToDeleteData = await Users
                                                .query()
                                                .select('user_id', 'isAdmin')                  
                                                .where('user_id', userId);

        console.log('checkUserIDAllowedToDeleteData[0].isAdmin', checkUserIDAllowedToDeleteData[0].isAdmin);
        console.log('checkUserIDAllowedToDeleteData[0].user_id', checkUserIDAllowedToDeleteData[0].user_id);
        console.log('req.session.userId', req.session.userId);

        if (checkUserIDAllowedToDeleteData[0].isAdmin && 
            checkUserIDAllowedToDeleteData[0].user_id != req.session.userId) {
                return res.status(403).json({
                    err: "Deletion of other admin users is not allowed"
                });
        }

        const userProfileDeletedData = await UserProfile
                                                .query()
                                                .delete()
                                                .where('user_id', userId);
        
        const userDeletedData = await Users.query().deleteById(userId);

        res.status(200).json({
            err: null,
            status: "User deleted successfully",
            userId: userId
        });


    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err); 
    }
});

router.put('/', checkIfAdmin, upload.single('updateProfileformAvatar'), async (req, res) => {
    console.log('req.body', req.body);
    console.log('req.file', req.file);

    try {
        const {
            userId,
            updateProfilePresentCompany, 
            updateProfileCurrentCTC, 
            updateProfileEmpStatus, 
            updateProfileAvailableToHire,
            updateProfileAvailableToFreelance,
            updateProfileCompanyAppliedFor
        } = req.body;


        const userProfileRecord = await UserProfile.query()
        .findOne({user_id: userId});

        const updateProfileAvailableToHireValue = (updateProfileAvailableToHire) ? true: false;
        const updateProfileAvailableToFreelanceValue = (updateProfileAvailableToFreelance) ? true: false;

        if (!userProfileRecord) {
            await UserProfile.query()
                .findById(userId)
                .insert({
                    user_id: userId,
                    present_company: updateProfilePresentCompany, 
                    current_ctc: updateProfileCurrentCTC, 
                    employment_status: updateProfileEmpStatus, 
                    available_to_hire: updateProfileAvailableToHireValue,
                    available_to_freelance: updateProfileAvailableToFreelanceValue,
                    company_applied_for: updateProfileCompanyAppliedFor
                });
        }
        else{
            const userUpdated = await UserProfile.query()
                .findById(userId)
                .patch({
                    present_company: updateProfilePresentCompany, 
                    current_ctc: updateProfileCurrentCTC, 
                    employment_status: updateProfileEmpStatus, 
                    available_to_hire: updateProfileAvailableToHireValue,
                    available_to_freelance: updateProfileAvailableToFreelanceValue,
                    company_applied_for: updateProfileCompanyAppliedFor
                });
        }
            

        res.status(200).json({
            err: null,
            status: "User updated successfully",
            userId: userId
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err); 
    }
});

module.exports = router;