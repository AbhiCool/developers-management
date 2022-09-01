const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('___dirname', '../', '/profileUploads'));
    },
    filename: async function (req, file, cb) {
        console.log(file);
        const fileExt = file.originalname.split('.').pop();

        cb(null, req.body.userId + '_' + Date.now() + '.' + fileExt);
    }
})

module.exports = multer({ storage: storage })