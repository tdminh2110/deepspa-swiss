module.exports = {
    checkSession: function(req, right) {
        if ((req.session.email) && (req.session.userRight === right)) 
            return true;
        else
            return false;
    }    
};