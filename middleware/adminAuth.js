const passport = require('passport');
const base64url = require('base64url');

module.exports.isAdmin = (req, res, next) => {
    if(req.authorization){
        const payload = req.authorization;
        
        next();
    }
    else{
        const err = new Error("Not an admin user");
        next(err);
    }
}
