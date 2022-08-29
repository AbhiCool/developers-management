// Import needed model
const Users = require('../db/models/users');

const sendMail = require('../utils/sendMail');

const sendSms = require('../utils/sendSms');

const {randomString} = require('../utils/commonFunctions');

const onSlashGet = (req, res) => {
    res.redirect("login");
} // End of onSlashGet

const onLoginGet = (req, res) => {
    res.render("login");
} // End of onLoginGet

const onLoginPost = async (req, res) => {
    console.log(req.body);

    const {loginFormEmail} = req.body

    const usersArray = await Users.query()
    .select('user_id', 'email_id', 'email_otp_verified', 'phone_otp_verified')
    .where('email_id', loginFormEmail)

    console.log('usersArray', usersArray);

    // If email provided is not present in users table
    if (usersArray.length === 0) {
        return res.status(403).json({
            err: "Invalid user"
        });
    }
    // If email id is present in  users table
    if (usersArray.length === 1) {
        const {user_id, email_otp_verified, phone_otp_verified}  = usersArray[0];
        // If either email_otp_verified or phone_otp_verified are false in table for loggin in user
        if (!email_otp_verified || !phone_otp_verified) {
            
            return res.status(403).json({
                err: "Cannot login as email otp or sms otp is not verified"
            });
        }
        
        // Here means user is valid.
        // Set the userId in session
        req.session.userId = user_id;

        console.log('req.session.userId in /login', req.session.userId);

        return res.json({
            err: null,
            status: "logged in successfully"
        });
    }
} // End of onLoginPost

const onSignUpGet = (req, res) => {
    res.render("signUp");
} // End of onSignUpGet

const onSignUpPost = async (req, res) => {
    console.log('req.body', req.body);
    // Create email otp
    const emaiOtp = randomString(4);

    // Create phoneOtp
    const phoneOtp = randomString(4);

    const { registerFormFirstName, registerFormLastName, registerFormEmail, registerFormPhone } = req.body;

    try {
        const userInsertData = await Users.query().insert({
            first_name: registerFormFirstName,
            last_name: registerFormLastName,
            email_id: registerFormEmail,
            phone: registerFormPhone,
            email_otp: emaiOtp,
            phone_otp: phoneOtp,
            email_otp_verified: false,
            phone_otp_verified: false,
            isAdmin: false
        });
        console.log(userInsertData.user_id);

        res.status(200).json({
            err: null,
            status: "Signed in successfully",
            userId: userInsertData.user_id
        });

        // Send the email with  emailOtp as its content
        const mailContent = `Hello ${registerFormFirstName} ${registerFormLastName},
        <p style="margin-top: 20px;">
            <span style="font-weight: bold;">${emaiOtp}</span> is your OTP to verify your email id.
        </p>
        <p>${phoneOtp} is phone otp send for development purposes.</p>`;
    
        sendMail({
            to: registerFormEmail,
            subject: 'OTP for Developers Management',
            html: mailContent
        });

        // Send the sms with phoneOtp as its content
        const smsContent = `Hello ${registerFormFirstName} ${registerFormLastName} - ${phoneOtp} is your OTP to verify your phone number.`;

        // sendSms(registerFormPhone, smsContent);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
} // End of onSignUpPost

const onLogoutGet = (req, res) => {
    // Destroys the session
    req.session.destroy();

    // Redirect to login page
    res.redirect("login");
} // End of onLogoutGet


const onVerifyEmailSmsOtpGet = (req, res) => {
    const userId = req.params.id;
    res.render("verifyEmailSmsOtp", {userId: userId});
} // End of onVerifyEmailSmsOtpGet

const onVerifyEmailSmsOtpPost = (req, res) => {
    console.log('req.body', req.body);

    const { emailOtp, smsOtp } = req.body;
} // End of onVerifyEmailSmsOtpGet

module.exports = {
    onSlashGet,
    onLoginGet,
    onLoginPost,
    onSignUpGet,
    onSignUpPost,
    onLogoutGet,
    onVerifyEmailSmsOtpGet,
    onVerifyEmailSmsOtpPost
};