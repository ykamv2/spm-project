var constants = require('../../constants/constantVariables');
exports.getUserByEmail = async (req, res) => {
	console.log('Request received for getting user details from email');
	var email = req.params.email;
	constants.mongoclient.connect(constants.url, function (err, db) {
		if (err) {
			res.status(500).send({ errors: err });
			return;
		};
		var dbo = db.db('hexafold');
		dbo
			.collection('user')
			.find({ email: email })
			.toArray((err, result) => {
				if (err) {
					res.status(500).send({ errors: err });
					return;
				};
				db.close();
				res.send(result);
			});
	});
};
