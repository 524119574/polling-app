module.exports = function(app, passport) {
	// app.get('/', function(req, res) {
	// 	res.render('index.ejs');
	// });
	var bodyParser = require('body-parser');
	var User = require('./models/user');
	var Poll = require('./models/poll');
	var Option = require('./models/option');

	app.use(bodyParser.urlencoded({ extended: true}));

	app.get('/', isUserLoginToViewPoll, function(req, res) {
		 res.render('poll.ejs', {
		 	user: req.user
		 });
	});

	app.get('/login', isNoNeedToLogin, function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.get('/profile', isLoggedIn, function(req, res) {
		Poll.find({'owner': req.user._id}, function(err, doc) {
			res.render('profile.ejs', {
				user: req.user,
				poll: doc
			});
			// res.send(doc);
		})
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.post('/addPoll', function(req, res) {
		Poll.findOne({'question': req.body.question}, function(err, docs) {
			if (err) {
				throw err
			}else {
				if (docs) {
					console.log('This Poll has already exist.');
					res.redirect('/');
				}else {
					Poll.count(function(err, docs) {
						console.log(docs);
						var poll = new Poll();
						var options = req.body.option;
						var numOfOptions = options.length;
						for (var i = 0; i < numOfOptions; i++) {
							if (options[i] !== "") {
								var option = {
									'choiceName': options[i],
									'choiceId': i
								}

								poll.choices.push(option);
							}
						}
						poll.question = req.body.question;
						poll.owner = req.user;
						poll.id = docs + 1;
						poll.save();
						var url = req.protocol + '://' + req.get('host') + '/' + req.user.local.email + '/' + poll.id;
						res.send(url)
					})
				}
			}
		})
	});

	app.post('/:email/:questionId/vote', function(req, res) {
		var optionId = req.body.id;
		var questionId = req.params.questionId;
		var field = 'choices.' + optionId + '.choiceCount';
		var updateQuery = {};
		updateQuery[field] = 1; /// this is so important!!!!
		// thanks to this link so very much!!!
		// https://stackoverflow.com/questions/11133912/how-to-use-a-variable-as-a-field-name-in-mongodb-native-findandmodify
		Poll.update({'id': questionId}, {$inc: updateQuery},
		function(err, doc) {
			if(!err) {
				console.log('Vote successfully!');
			}

		})
	});

	app.post('/profile/delete', isLoggedIn, function(req, res) {


		Poll.findOne({'id': req.body.id}).remove(function(err, doc) {
			if (!err) {
				console.log('success!!!')
			}
		})
	});


	app.get('/:email/:questionId', function(req, res) {
		var emailAddress = req.params.email;
		var questionId = req.params.questionId;
		User.findOne({'local.email': emailAddress}, function(err, user) {
			if (err) {
				throw err
			}else {
				if (!user) {
					res.send('No user found');
				}else {
					Poll.findOne({'id': questionId}, function(err, poll) {
						if (err) {
							throw err
						}else {
							if (!poll) {
								res.send('No such poll');
							}else {
								res.render('poll-detail.ejs', {
									poll: poll
								});
							}
						}
					});
				}
			}
		})
	});



}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}

function isUserLoginToViewPoll(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.render('index.ejs');
}

function isNoNeedToLogin(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}