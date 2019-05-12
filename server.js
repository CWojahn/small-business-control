const express 		= require('express');
const app 			= express();
const passport 		= require('passport');
const session 		= require('express-session');
const bodyParser 	= require('body-parser');
const env 			= require('dotenv').config();
const models 		= require('./app/models');
const exphbs 		= require('express-handlebars');
const authRoute		= require('./app/routes/auth.js')(app);

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({ secret: 'senha secreta',resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
	res.send('Welcome');
});

app.listen(5000, function(err){
	if(!err)
		console.log('site is live');
	else console.log(err);
})

models.sequelize.sync().then(function(){
	console.log('Beleza tudo BD funcionando!')
}).catch(function(err){
	console.log(err, 'Erro no BD')
});

app.set('views', './app/views')
app.engine('hbs', exphbs({
	extname: '.hbs'
}));
app.set('view engine', '.hbs');