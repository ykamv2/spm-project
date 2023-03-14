var constants = require('../../../constants/constantVariables');

exports.getUserProjects = async (req, res) => {
	try {
		console.log('Request received for getting projects of a user');
		var email = req.params.userId;
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			}
			var dbo = db.db('hexafold');
			dbo
				.collection('project')
				.find({ users: { $in: [email] } })
				.sort({deadline: 1})
				.toArray((err, result) => {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					}
					db.close();
					res.send(result);
				});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
