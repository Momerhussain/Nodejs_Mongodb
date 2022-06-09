const multer = require('multer');
const path = require('path');
const maxSize = 5 * 1024 * 1024; //5mb

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
        if (req.files.file.length > maxSize) {
            return false;
        }
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4'];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        return cb(new Error('Invalid file type.'), false);
    }
};

const fileLimits = {
    fileSize: maxSize,
    files: 4,
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: fileLimits,
    onError: function (err, next) {
        console.log('error', err);
        next(err);
    },
});

module.exports = {
    upload,
};
