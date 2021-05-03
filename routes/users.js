var express = require('express');
var router = express.Router();
const passport = require('passport');

const User = require('../ models/userModel');
const password = require('../Authentication/password'); 
const authenticate = require('../Authentication/authenticate');
const isAdmin = require('../middleware/adminAuth').isAdmin;
/* GET users listing. */
router.get('/',passport.authenticate('jwt', {session: false}) ,function(req, res, next) {
	console.log(req.isAuthenticated());
  User.find({})
  .then((user) => {
    res.statusCode = 200;
    res.json(user);
  })
  .catch((err) => next(err));
})
router.post('/signup',(req, res, next) => {
	const saltAndHash = password.genSaltAndHash(req.body.password);

	const newUser = new User({
	fname: req.body.fname,
	lname: req.body.lname,
	username: req.body.username,
	email: req.body.email
	});
	
	newUser.salt = saltAndHash.salt;
	newUser.hash = saltAndHash.hash;

	newUser.save()
	.then((user) => {
		res.statusCode = 200;
		res.setHeader('content-type', 'application/json');
		res.json(user);
	}, (err) => next(err))
	.catch((err) => next(err));

})

router.post('/login', passport.authenticate('local'),(req, res, next) => {
	res.statusCode = 200;
	const returned = authenticate.issueJwt(req.user);
	res.json({token: returned.token, expiresIn: returned.expiresIn});
  }); 

router.post('/signup/admin', (req, res,next) => {
  User.register(req.body, req.body.password, (err, user) => {
    if(err){
      next(err);
    }
    else{
      user.admin = true;
      user.save()
      .then((user) => {
        res.statusCode = 200;
        res.json(user);
      }, (err) => next(err))
      .catch((err) => next(err));
    }
  })
})
module.exports = router;
