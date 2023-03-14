var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.addFact = async (req, res) => {
	try {
		console.log('Request received for adding fact');
		var post = {
			content: req.body.content,
			company_id: new ObjectId(req.body.company_id)
		};
		
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
   				return;
			};

			var dbo = db.db('hexafold');
			dbo
				.collection('fact')
				.insertOne(post, function(err, result) {
					if (err) {
				 		res.status(500).send({ errors: err });
						return;
			    	};
					
					console.log("New Fact Added", result);
					db.close();
					res.status(200).send({message: 'New Fact Added'})
				});
		});
	} catch (err) {
		res.status(500).send({errors: err});
	}
};