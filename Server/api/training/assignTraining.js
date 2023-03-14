var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.assignTraining = async (req, res) => {
	try {
		console.log('Request received to assign Training');

        var training_id = req.body.training_id;
        var assignees = req.body.assignees;
        var deadline = req.body.deadline;

        userTraining = {
            training_id: new ObjectId(training_id),
            status: "pending",
            deadline: deadline
        }
		
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
		 	};	

			var dbo = db.db('hexafold');
                dbo
                    .collection('user')
                    .updateMany(
                        {email: {$in: assignees }},
                        {$push: {trainings: userTraining}},
                        function(err, result) {
                            if (err) {
                                res.status(500).send({ errors: err });
                                return;
                            };	
                            console.log("Training Assigned", result);
                            db.close();
                            res.status(200).send({message: 'Training Assigned'})
                        });			
		});
	} catch (err) {
		res.status(500).send({errors: err});
	}
};