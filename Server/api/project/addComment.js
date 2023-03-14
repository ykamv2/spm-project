var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.addComment = async (req, res) => {
	try {
		console.log('Request received for adding Comment');
		var project_id = new ObjectId(req.body.project_id);

		var comment = {
			// user_type: req.body.user_type,
			email: req.body.email,
			content: req.body.content,
            timestamp: new Date().toISOString()
		};

		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};

			var dbo = db.db('hexafold');

            dbo
				.collection('project')
				.updateOne({_id: project_id}, 
				{$push : {comments: comment}},
				function(err, result) {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					};
					console.log("Comment Added Successfully", result);
					res.status(200).send({message: 'Comment Added Successfully'})
					db.close();
				});
			
		});
	} catch (err) {
		res.status(500).send({errors: err});
	}
};