const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const Controller = require('./controllers/controller.js');
const app = express();
const router = express.Router();

// set up template ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// fire controllers
Controller(app, router);

// listen to port
app.listen(PORT, function () {
	console.log('You are listeing to port ' + PORT + '!');
});
