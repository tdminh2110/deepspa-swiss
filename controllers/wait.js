const session = require('./common/session');

exports.uploadingFiles = (req, res, next) => {    
    res.render('common/wait/uploading-files');    
};