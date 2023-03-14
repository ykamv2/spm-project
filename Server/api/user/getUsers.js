var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.getUsers = async (req, res) => {
	var company = new ObjectId(req.params.company);
	console.log('Request received for getting users');
	constants.mongoclient.connect(constants.url, function (err, db) {
		if (err) {
			res.status(500).send({ errors: err });
			return;
		};
		var dbo = db.db('hexafold');
		dbo
			.collection('user')
			.find({company_id: company})
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
