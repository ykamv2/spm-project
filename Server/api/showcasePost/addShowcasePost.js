const ObjectId = require('mongodb').ObjectId;
var constants = require('../../constants/constantVariables');

exports.addShowcasePost = async (req, res) => {
	try {
		console.log('Request received for adding showcase post');
		var post = {
			// post_type: req.body.post_type,
			title: req.body.title,
			content: req.body.content,
			img: req.body.img,
			// tags: [], /* change */
			// is_pinned: false,
			likes_count: 0,
			likes: [],
			comments: [],
			company_id: new ObjectId(req.body.company_id),
			date_posted: new Date().toISOString().split("Z")[0].split("T").join(" ")
		};
		
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });   
				return;
			};

			var dbo = db.db('hexafold');
			dbo
				.collection('showcase_post')
				.insertOne(post, function(err, result) {
					if (err) {
				 		res.status(500).send({ errors: err });
						return;
			    	};
					console.log("New Showcase Post Added", result);
					db.close();
					res.status(200).send({message: 'New Showcase Post Added'})
				});
		});
	} catch (err) {
		res.status(500).send({errors: err});
	}
};