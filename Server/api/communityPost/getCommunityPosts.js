var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.getCommunityPosts = async (req, res) => {
	try {
		var company = new ObjectId(req.params.company);
		var post_type = req.params.post_type;
		console.log('Request received for fetching community posts');
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });	  
				return;
			};
			var dbo = db.db('hexafold');
			dbo
				.collection('community_post')
				.find({company_id: company, post_type: post_type })
				.toArray((err, result) => {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					};
					console.log(result);
					db.close();
					res.send(result);
				});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
