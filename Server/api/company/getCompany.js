var ObjectId = require('mongodb').ObjectId;
var constants = require('../../constants/constantVariables');

exports.getCompany = async (req, res) => {
	try {
		console.log('Request received for getting company details');
		var id = new ObjectId(req.params.id);

		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};
			var dbo = db.db('hexafold');
			dbo
				.collection('company')
				.find({ _id: id })
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
		res.status(500).send({errors: err});
	}
};
