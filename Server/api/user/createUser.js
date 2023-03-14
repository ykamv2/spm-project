const { ObjectId } = require('mongodb');
var constants = require('../../constants/constantVariables');

exports.createUser = async (req, res) => {
	try {
		console.log('Request received for creating a user');
		var post = {
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
			position: req.body.position,
			user_type: req.body.userType,
			manager: req.body.manager ? new ObjectId(req.body.manager) : '',
			company_id: new ObjectId(req.body.company_id),
			reward_points: 0,
			trainings: [],
			redeem_rewards: [],
			phone_number: req.body.phone_number,
		};

		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};

			var dbo = db.db('hexafold');
			

			dbo
				.collection('user')
				.find({ email: post.email })
				.toArray((err, result) => {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					};
					
					if (result.length != 0) {
						res.status(200).send({ message: 'User already exists' });
					} else {
						dbo.collection('user').insertOne(post, function (err, result) {
							if (err) {
								res.status(500).send({ errors: err });
								return;
							};
							console.log('New User Added', result);
							db.close();
							res.status(200).send({ message: 'New User Added' });
						});
					}
				});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
