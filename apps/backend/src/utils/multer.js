"use strict";
exports.__esModule = true;
var multer = require('multer');
var path = require('path');
// Multer config
var upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp' && ext !== '.svg' && ext !== '.pdf' && ext !== '.doc' && ext !== '.docx' && ext !== '.mp4') {
            cb(new Error('File type is not supported'), false);
            return;
        }
        cb(null, true);
    }
});
exports["default"] = upload;
