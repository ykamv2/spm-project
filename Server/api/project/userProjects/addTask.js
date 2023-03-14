const { ObjectId } = require('mongodb');
var constants = require('../../../constants/constantVariables');

exports.addTask = async (req, res) => {
	try {
		console.log('Request received for adding a task to a task');
		var projectId = new ObjectId(req.body.projectId);
		var feature_title = req.body.feature_title;
		var post = {
			priority: req.body.priority,
			task_title: req.body.task_title,
			description: req.body.description,
			startDateTime: req.body.startDateTime,
			deadline: req.body.deadline,
			// asignor: req.body.assignor, //pushpit ko batana h
			status: 'TODO',
			assignedEmployee: req.body.assignedEmployee,
			reward_points: req.body.reward_points ? req.body.reward_points : 0,
		};

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

					'features.tasks.task_title': post.task_title,
				})
				.toArray((err, result) => {
					if (err) {
						res.status(500).send({ errors: err });
						return;
					}
					console.log(result, post, feature_title);
					if (result.length != 0) {
						res.status(200).send({ message: 'Task already exists' });
					} else {
						dbo.collection('project').updateOne(
							{ _id: projectId },
							{
								$push: { 'features.$[ele].tasks': post },
							},
							{ arrayFilters: [{ 'ele.feature_title': feature_title }] },
							function (err, result) {
								if (err) {
									res.status(500).send({ errors: err });
									return;
								}
								console.log('New Task Added', result);
								db.close();
								res.status(200).send({ message: 'New Task Added' });
							}
						);
					}
				});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
