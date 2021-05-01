const passport = require('passport');
module.exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin){
        next();
    }
    else{
        const err = new Error("Not an admin user");
        next(err);
    }
}
