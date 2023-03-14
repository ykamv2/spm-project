const { ObjectId } = require('mongodb');
var constants = require('../../../constants/constantVariables');

exports.createProject = async (req, res) => {
	try {
		console.log('Request received for creating a project');
		var post = {
			clients: req.body.clients ? req.body.clients : '',
			project_title: req.body.project_title ? req.body.project_title : '',
			comments: [],
			features: [],
			users: req.body.users,
			deadline: req.body.deadline,
			description: req.body.description ? req.body.description : '',
			company_id: new ObjectId(req.body.company_id),
		};

		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
				return;
			}

			var dbo = db.db('hexafold');
			dbo
				.collection('project')
				.find({ project_title: post.project_title })
				.toArray((err, result) => {
					if (result.length != 0) {
						res.status(200).send({ message: 'Project already exists' });
					} else {
						dbo
							.collection('project')
							.find({ project_title: post.project_title })
							.toArray((err, result) => {
								if (result.length != 0) {
									res.status(200).send({ message: 'Project already exists' });
								} else {
									dbo.collection('project').insertOne(post, function (err, result) {
										if (err) {
											res.status(500).send({ errors: err });
											return;
										}
										console.log('New Project Added', result);
										db.close();
										res.status(200).send({ message: 'New Project Added' });
									});
								}
							});
					}
				});
		});
	} catch (err) {
		res.status(500).send({ errors: err });
	}
};
