var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.redeemReward = async (req, res) => {
	try {
		console.log('Request received to redeem reward');

        var user = req.body.user;
        var reward_id = req.body.reward_id
        var points = req.body.points

		var reward = {
			reward: new ObjectId(reward_id),
			redeem_date : new Date().toISOString().split("T")[0],
		};
		
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			};
			var dbo = db.db('hexafold');

            dbo
                .collection('user')
                .updateOne(
                    {email: user},
                    {$push: {redeemed_rewards: reward}, $inc: {reward_points: -points}},
                    function(err, result) {
                        if (err) {
                            res.status(500).send({ errors: err });
                            return;
                        };
                    console.log("Reward Redeemed", result);
                    db.close();
                    res.status(200).send({message: 'Reward Redeemed'})
                });
		});
	} catch (err) {
		res.status(500).send({errors: err});
	}
};