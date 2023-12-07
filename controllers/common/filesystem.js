const fs = require('fs')
var path = require("path");

function ensureDirSync (dirPath) {
    try {        
        fs.mkdirSync(dirPath, { recursive: false })        
    } catch (err) {        
      if (err.code === 'EEXIST') throw err
    }
}

module.exports.FOLDER_UPLOAD = "public/uploads/";

module.exports.removeFolder = function(dirPath) {    
    if (!fs.existsSync(dirPath)) {        
        return;
    }

    var list = fs.readdirSync(dirPath);    
    for (var i = 0; i < list.length; i++) {        
        var filename = path.join(dirPath, list[i]);        
        var stat = fs.statSync(filename);

        if (filename == "." || filename == "..") {
        } else if (stat.isDirectory()) {
            this.removeFolder(filename);
        } else {
            fs.unlinkSync(filename);
        }
    }

    fs.rmdirSync(dirPath);
};

module.exports.createFolder = function(dirPath) {
    try {
        ensureDirSync(dirPath);        
        return true;
    } catch (err) {        
        return false;
    }
}

