const { ObjectId } = require('mongodb');
var constants = require('../../constants/constantVariables');

exports.createReward = async (req, res) => {
	try {
		console.log('Request received for creating a reward');
		var reward = {
			title: req.body.title,
			description: req.body.description,
            points: req.body.points,
            image: req.body.image ? req.body.image : '',
            status: 'active',
			company_id: new ObjectId(req.body.company_id),
		};

		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};

			var dbo = db.db('hexafold');
			dbo.collection('reward').insertOne(reward, function (err, result) {
				if (err) {
					res.status(500).send({ errors: err });
					return;
				};
				console.log('New Reward Added', result);
				res.status(200).send({ message: 'New Reward Added' });
				db.close();
			});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
