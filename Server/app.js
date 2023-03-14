var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var api = require('./api/api');

var jsonParser = bodyParser.json();
const app = express();
app.use(cors());

app.get('getCompany/:id', api.getCompany);

app.get('/allClients/:company', api.getClients);
app.get('/client/:email', api.getClientByEmail);
app.post('/createClient', jsonParser, api.createClient);

app.get('/allUsers/:company', api.getUsers);
app.get('/user/:email', api.getUserByEmail);
app.post('/createUser', jsonParser, api.createUser);

app.get('/getTraining/:training_id', api.getTraining);
app.get('/getAllTrainings/:company', api.getAllTrainings);
app.get('/getUserTrainings/:email', api.getUserTrainings);
app.post('/addTraining', jsonParser, api.addTraining);
app.post('/assignTraining', jsonParser, api.assignTraining);
app.put('/updateTrainingStatus', jsonParser, api.updateTrainingStatus);

app.get('/communityPosts/:company/:post_type', api.getCommunityPosts);
app.post('/addCommunityPost', jsonParser, api.addCommunityPost);
app.put('/updateCPLikeComment', jsonParser, api.updateCPLikeComment);
app.put('/removeAnnouncement', jsonParser, api.removeAnnouncement);

app.get('/showcasePosts/:company', api.getShowcasePosts);
app.post('/addShowcasePost', jsonParser, api.addShowcasePost);
app.put('/updateSPLikeComment', jsonParser, api.updateSPLikeComment);

app.get('/project/client/:clientId', api.getClientProjects);

app.get('/project/user/:userId', api.getUserProjects);
app.post('/createProject', jsonParser, api.createProject);
app.post('/addTask', jsonParser, api.addTask);
app.put('/updateTask', jsonParser, api.updateTask);

app.post('/addFeature', jsonParser, api.addFeature);
app.put('/updateFeatureStatus', jsonParser, api.updateFeatureStatus);
app.post('/addComment', jsonParser, api.addComment);
app.get('/project/:projectId', api.getProject);
app.put('/removeFeature', jsonParser, api.removeFeature);

app.get('/rewards/:company', api.getRewards);
app.post('/createReward', jsonParser, api.createReward);
app.post('/redeemReward', jsonParser, api.redeemReward);
app.put('/updateRewardStatus', jsonParser, api.updateRewardStatus);

app.post('/addFact', jsonParser, api.addFact);
app.get('/getRandomFact/:company', jsonParser, api.getRandomFact);

server = app.listen(process.env.PORT || 8080);
