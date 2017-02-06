
const bodyParser = require('body-parser');

module.exports = function (app, router) {

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	router.use(function (req, res, next) {
		next();
	});

	router.get("/", function (req, res) {
		res.render('index', {
			title: 'home'
		});
	});

	app.use("/", router);

	// 404
	app.use("*", function (req, res) {
		res.render('404', {
			title: '404',
		});
	});

};
