var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.getUserTrainings = async (req, res) => {
	try {
		console.log('Request received for getting user trainings');
        var user = req.params.email;
		
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
                res.status(500).send({ errors: err });
                return;
            };
            result_trainings = []

			var dbo = db.db('hexafold');
			dbo
				.collection('user')
                .find({ email: user })
                .toArray((err, result) => {
                    if (err) {
                        res.status(500).send({ errors: err });
                        return;
                    };

                    if (result.length != 0) {
                        var trainings = result[0].trainings;
                        console.log(trainings);

                        // trainings.forEach(training => {
                        for (let i in trainings) {
                            
                            dbo
                            .collection('training')
                            .find({ _id: new ObjectId(trainings[i].training_id) })
                            .toArray((err, result2) => {
                                    if (err) {
                                        res.status(500).send({ errors: err });
                                        return;
                                    };
                                    
                                    result_trainings.push({
                                        training_id: trainings[i].training_id,
                                        status: trainings[i].status,
                                        deadline: trainings[i].deadline,
                                        title: result2[0].title,
                                        reward: result2[0].reward,
                                        content: result2[0].content,
                                        urls: result2[0].urls,
                                    })

                                    if ((Number(i) + 1) == trainings.length){
                                        db.close();
                                        res.send(result_trainings);
                                    }
                                });
                            }
                    } else {
                        res.send(result_trainings);
                    }

                    
                    
                });
		});
	} catch (err) {
		res.status(500).send({errors: err});
	}
};