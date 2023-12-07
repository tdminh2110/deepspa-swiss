const fs = require('fs')
const fileSystem = require('./filesystem');

module.exports.updateData = function(idPathFolder, pathSession, nameTest, jsonData) {
    let fileName = fileSystem.FOLDER_UPLOAD + idPathFolder + "/" + pathSession + "/" + "data.json";

    if (fs.existsSync(fileName)) {
        const fileContents = fs.readFileSync(fileName);
        try {
            let obj = JSON.parse(fileContents);
            if (obj[idPathFolder][pathSession][nameTest] === undefined) {            
                obj[idPathFolder][pathSession][nameTest] = Object.assign(jsonData);
            } else {
                obj[idPathFolder][pathSession][nameTest] = Object.assign(obj[idPathFolder][pathSession][nameTest], jsonData);
            }            
            let data = JSON.stringify(obj, null, 4);
            fs.writeFileSync(fileName, data, (err) => {
                if (err) throw err;                
            });
        } catch(err) {
            console.error(err);
        }
    } else {
        let objidPathFolder = {};
        let objpathSession = {};
        let objNameTest = {};       
        
        objNameTest[nameTest] = jsonData;
        objpathSession[pathSession] = objNameTest;
        objidPathFolder[idPathFolder] = objpathSession;

        let data = JSON.stringify(objidPathFolder, null, 4);

        fs.writeFileSync(fileName, data, (err) => {
            if (err) throw err;                
        });
    }
} 