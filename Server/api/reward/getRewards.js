var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.getRewards = async (req, res) => {
	try {
		console.log('Request received for getting rewards');
		var company = new ObjectId(req.params.company);

		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};
			var dbo = db.db('hexafold');
			dbo
				.collection('reward')
				.find({ company_id: company, status: 'active' })
				.toArray((err, result) => {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					};
					db.close();
					res.send(result);
				});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
