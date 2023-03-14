
import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrls {

    address = "https://hexafold-api.herokuapp.com/";
    // address = "localhost:8080/";

    // USER / CLIENT
    getAllClients = this.address + 'allClients/{companyId}';
    getClientByEmail = this.address + "client/{email}";
    createClient = this.address + 'createClient';

    createUser = this.address + 'createUser';
    getAllUsers = this.address + 'allUsers/{companyId}';
    getUserByEmail = this.address + "user/{email}";


    // PROJECT
    addProject = this.address + 'createProject';
    getParticularProject = this.address + "project/{projectId}";
    getUserProjects = this.address + "project/user/{userId}";
    getClientProjects = this.address + "project/client/{clientId}";

    // updateStatus = this.address + 'updateStatus';     // pending - put
    addComment = this.address + 'addComment';

    // Tasks
    addTask = this.address + 'addTask';
    updateTask = this.address + 'updateTask'; 

    // Features
    addFeature = this.address + 'addFeature';
    updateFeatureStatus = this.address + 'updateFeatureStatus'; 
    removeFeature = this.address + 'removeFeature';

    // COMMUNITY APIS
    getCommunityPosts = this.address + 'communityPosts/{companyId}/{post_type}';
    addCommunityPosts = this.address + 'addCommunityPost';
    updateCPLikeComment = this.address + 'updateCPLikeComment';
    removeAnnouncement = this.address + 'removeAnnouncement';
    
    // Showcase
    getShowcasePosts = this.address + 'showcasePosts/{companyId}';
    addShowcasePost = this.address + 'addShowcasePost';
    updateSPLikeComment = this.address + 'updateSPLikeComment';

    

    // Training
    getAllTrainings = this.address + "getAllTrainings/{companyId}";
    getParticularTraining = this.address + 'getTraining/{training_id}';
    addTraining = this.address + "addTraining";
    updateTrainingStatus = this.address + "updateTrainingStatus";
    getUserTrainings = this.address + "getUserTrainings/{email}";
    assignTraining = this.address + "assignTraining";

    // Rewards
    getRewards = this.address + 'rewards/{companyId}';
    addReward = this.address + 'createReward'; 
    redeemReward = this.address + 'redeemReward'; // pending : getUserDataCall
    updateRewardStatus = this.address + 'updateRewardStatus'; // not to be done

    // FACTS
    addFact = this.address + "addFact";
    getRandomFact = this.address + "getRandomFact/{companyId}";

}