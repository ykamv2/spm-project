const { ObjectId } = require('mongodb');
var constants = require('../../constants/constantVariables');

exports.removeAnnouncement = async (req, res) => {
	try {
		console.log('Request received for removing a communtiy');
		var id = new ObjectId(req.body.id);
		var post_type = req.body.post_type;
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			}

			var dbo = db.db('hexafold');
			dbo
				.collection('community_post')
				.find({
					_id: id,
					post_type: post_type,
				})
				.toArray((err, result) => {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					}

					if (result.length == 0) {
						res.status(200).send({ message: 'Post does not exist' });
					} else {
						dbo.collection('community_post').deleteOne({ _id: id }, function (err, result) {
							if (err) {
								res.status(500).send({ errors: err });
								return;
							}
							console.log('Community Post Deleted', result);
							db.close();
							res.status(200).send({ message: 'Community post deleted' });
						});
					}
				});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
