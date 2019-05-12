const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user){
	const User = user;
	const LocalStrategy = require('passport-local').Strategy;
}

passport.use('local-signup', new LocalStrategy({
	usernameField: 	'username',
	passwordField:  'password',
	passReqToCallback: true
	},
));