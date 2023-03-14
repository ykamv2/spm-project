const { ObjectId } = require('mongodb');
var constants = require('../../constants/constantVariables');

exports.removeFeature = async (req, res) => {
	try {
		console.log('Request received for removing a feature');
		var projectId = new ObjectId(req.body.projectId);
		var feature_title = req.body.feature_title;
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			}

			var dbo = db.db('hexafold');
			dbo
				.collection('project')
				.find({
					'features.feature_title': feature_title,
				})
				.toArray((err, result) => {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					}

					if (result.length == 0) {
						res.status(200).send({ message: 'Feature does not exist' });
					} else {
						dbo
							.collection('project')
							.updateOne(
								{ _id: projectId },
								{ $pull: { features: { feature_title: feature_title } } },
								function (err, result) {
									if (err) {
										res.status(500).send({ errors: err });
										return;
									}
									console.log('Feature Deleted', result);
									db.close();
									res.status(200).send({ message: 'Feature deleted' });
								}
							);
					}
				});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
