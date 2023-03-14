var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.updateRewardStatus = async (req, res) => {
	try {
		console.log('Request received for updating Reward');
        var reward_id = req.body.reward_id;
        var status = req.body.status;
		
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};

            var myquery = {_id: new ObjectId(reward_id)};           
            var newvalues = {$set: {status: status} };

			var dbo = db.db('hexafold');
			dbo
                .collection('reward')
				.updateOne(myquery, newvalues, function(err, result) {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					};
					console.log("Reward Updated Successfully", result);
					res.status(200).send({message: 'Reward Updated Successfully'})
					db.close();
				});
		});
	} catch (err) {
		res.status(500).send({errors: err});
	}
};