module.exports.createFragmentString = function(strInput) {
    if (strInput != "") {
        strInput = strInput.replace(/\s/g, "");
        if (strInput.length >= 3) {
            return strInput.slice(0, 3);
        } else {            
            if (strInput.length == 1) {
                return strInput + strInput + strInput;
            } else {
                let lastChar = strInput.substr(strInput.length - 1);
                return strInput + lastChar;
            }
        }
    } else {
        return "";
    }
}

module.exports.addZeroWithNumber = function(strInput) {
    return strInput.length < 2 ? "0" + strInput : strInput;
}
