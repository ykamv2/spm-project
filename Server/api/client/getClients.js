var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.getClients = async (req, res) => {
	try{
		var company = new ObjectId(req.params.company);
		console.log('Request received for getting users');
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};
			
			var dbo = db.db('hexafold');
			dbo
				.collection('client')
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
	} catch (err) {
		res.status(500).send({errors: err});
	}
};
