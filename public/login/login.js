const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const connection = mysql.createConnection({
	host : '',
	user : '',
	password : '',
	database : ''
});

cons app = express();

app.use(session({
	secret : 'secret',
	resave : true,
	saveUninitialized : true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.get('/', function(request, response){
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response){
	const name = request.body.username;
	const password = request.body.password;
	if (username && password){
		connection.query('SELECT * FROM "tabela de usuarios" WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
			if (results.length > 0 ){
				request.session.leggedin= true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Usuário ou senha errada!');
			}
			response.end();
		});
	} else {
		response.send('Entre com o seu Usuário e Senha!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Bem vindo de volta, ' + request.session.username + '!');
	} else {
		response.send('Faça login para poder olhar essa página!');
	}
	response.end();
});

app.listen(3000);