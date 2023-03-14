var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.getShowcasePosts = async (req, res) => {
	try {
		var company = new ObjectId(req.params.company);
		console.log('Request received for getting showcase posts');
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};
			var dbo = db.db('hexafold');
			dbo
				.collection('showcase_post')
				.find({company_id: company})
				.toArray((err, result) => {
					if (err) {
						console.log(err.errmsg);
						res.status(500).send({ errors: err });
						return;
					};
					console.log(result);
					db.close();
					res.send(result);
				});
		});
	} catch (err) {
		res.status(500).send({errors: err});
	}
	
};
