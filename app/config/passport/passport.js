const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user){
	const User = user;
	const LocalStrategy = require('passport-local').Strategy;


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findByPk(id).then(function(user){
			if (user){
				done(null, user.get());
			}
			else {
				done(user.errors, null);
			}
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 	'email',
		passwordField:  'password',
		passReqToCallback: true
		},

		function(req, email, password, done){

			const generateHash = function(password){
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			};

		User.findOne({
			where: {
				email: email
			}
		}).then(function(user){
			if(user){
				return done(null, false, {
					message: 'Esse usuario já existe'
				});
			}
			else {
				const userPassword = generateHash(password);
				const userInformation = {
					email: email,
					password: userPassword,
					firstname: req.body.firstname,
					lastname: req.body.lastname
				};
			User.create(userInformation).then(function(newUser, created){
				if (!newUser){
					return done(null, false);
				}

				if (newUser){
					return done(null, newUser);
				}
			});
			}
		});
		}
	));


//signin
	passport.use('local-signin', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},

	function(req, email, password, done){
		const User = user;
		const isValidPassword = function(userpass, password){
			return bCrypt.compareSync(password, userpass);
		}
		User.findOne({
			where: {
				email: email
			}
		}).then(function(user){
			if(!user){
				return done(null, false, {
					message: 'não existe'
				});
			}
			if (!isValidPassword(user.password, password)){
				return done(null, false, {
					message: 'senha invalida'
				});
			}
			const userinfo = user.get();
			return done(null, userinfo);
		}).catch(function(err){
			console.log('Error: ', err);

			return done(null, false, {
				message: 'algo de errado'
			});
		});
	}
	));
}