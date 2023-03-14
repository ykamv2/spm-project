var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.addCommunityPost = async (req, res) => {
	try {
		console.log('Request received for adding community post');
		var post = {
			company_id: new ObjectId(req.body.company_id),
			user: req.body.user,
			post_type: req.body.post_type,
			title: req.body.title,
			content: req.body.content,
			// tags: [] /* change */,
			// is_pinned: false,
			likes_count: 0,
			likes: [],
			comments: [],
			date_posted: new Date().toLocaleString()
		};

		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};

			var dbo = db.db('hexafold');
			dbo.collection('community_post').insertOne(post, function (err, result) {
				if (err) {
					res.status(500).send({ errors: err });
				   	return;
			    };
				console.log('New Community Post Added', result);
				db.close();
				res.status(200).send({ message: 'New Community Post Added' });
			});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
