var constants = require('../../constants/constantVariables');

exports.createClient = async (req, res) => {
	try {
		console.log('Request received for creating a client');
		var post = {
			email: req.body.email,
			name: req.body.name,
			password: req.body.password,
			company: req.body.company ? req.body.company : '',
			company_id: new ObjectId(req.body.company_id),
		};

		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};

			var dbo = db.db('hexafold');

			dbo
				.collection('client')
				.find({ email: post.email })
				.toArray((err, result) => {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					};
					
					if (result.length != 0) {
						res.status(200).send({ message: 'Client already exists' });
					} else {
						dbo.collection('client').insertOne(post, function (err, result) {
							if (err) {
								res.status(500).send({ errors: err });
								return;
							};
							console.log('New Client Added', result);
							db.close();
							res.status(200).send({ message: 'New Client Added' });
						});
					}
				});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
