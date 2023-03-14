var constants = require('../../constants/constantVariables');
exports.getClientByEmail = async (req, res) => {
	console.log('Request received for getting client details from email');
	var email = req.params.email;
	constants.mongoclient.connect(constants.url, function (err, db) {
		if (err) {
			res.status(500).send({ errors: err });
			return;
		};
		var dbo = db.db('hexafold');
		dbo
			.collection('client')
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
