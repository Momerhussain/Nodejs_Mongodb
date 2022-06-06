const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        cb(null, `${randomName}${path.extname(file.originalname)}`);
    },
    onFileUploadStart: function (file, req, res) {

    },
});


const upload = multer({
    storage: storage,
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    },
});

module.exports = {
    upload,
};
