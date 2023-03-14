var constants = require('../../constants/constantVariables');
var ObjectId = require('mongodb').ObjectId;

exports.updateCPLikeComment = async (req, res) => {
	try {
		console.log('Request received for updating Like/Comment for Community post');
        var post_id = new ObjectId(req.body.post_id);
        var user = req.body.user;
        var type = req.body.type;
        var content = req.body.content;
		
		constants.mongoclient.connect(constants.url, function (err, db) {
			if (err) {
				res.status(500).send({ errors: err });
                return;
			};

            var myquery = {_id: post_id};
            if (type == 'like'){
                if (content == 'add') {
                    var newvalues = {$push: { "likes": user }, $inc: { likes_count: 1 } };
                } else {
                    var newvalues = {$pull: { "likes": user }, $inc: { likes_count: -1 } };
                }
                
            } else if (type == 'comment') {
                comment = {
                    user: user,
                    content: content,
                    timestamp: new Date().toLocaleString()
                };
                var newvalues = {$push: { "comments": comment }};
            } else {
                res.status(400).send({message: 'Invalid type'})
            }
            

			var dbo = db.db('hexafold');
			dbo
                .collection('community_post')
				.updateOne(myquery, newvalues, function(err, result) {
					if (err) {
                        res.status(500).send({ errors: err });
                        return;
			        };
					console.log("Like/Comment Updated Successfully", result);
					db.close();
					res.status(200).send({message: 'Like/Comment Updated Successfully'})
				});
		});
	} catch (err) {
		res.status(500).send({errors: err});
	}
};