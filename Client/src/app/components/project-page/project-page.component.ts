import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralService } from 'src/app/services/general.service';
import { UserClientService } from 'src/app/services/user-client.service';
import { HomeComponent } from '../home/home.component';
import { AddFeaturePopupComponent } from '../popups/add-feature-popup/add-feature-popup.component';
import { AddTaskPopupComponent } from '../popups/add-task-popup/add-task-popup.component';
import { FeatureCostPopupComponent } from '../popups/feature-cost-popup/feature-cost-popup.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  sessionData:any;
  projectId:any;
  projectData:any;
  pcomment:any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private authService : AuthenticationService,
    private userClientService: UserClientService,
    private generalService: GeneralService
  ) {
    // Function to throw unsigned user out
    this.authService.currentUser$.subscribe((user:any) => {
      if(user){
        // console.log(user);
      }else{
        this.router.navigate(["home"]);
        this.authService.navigationSubject.next("home");
      }
    })
  }

  ngOnInit(): void {
    this.sessionData = this.generalService.getSessionData();

    this.projectId = this.activatedRoute.snapshot.paramMap.get('project_id');
    // console.log(this.projectId);
    this.getProjectData(this.projectId);
    
  }

  showContent(i:any){
    this.projectData.features[i].showContent = !this.projectData.features[i].showContent;
  }

  getProjectData(projectId:any){

    this.userClientService.getParticularProjects(projectId).subscribe((response:any) => {
      if(response){
        console.log(response);
        this.projectData = response[0];
        this.setProgress();
      }
    }, (error:any)=>{
      console.log("Error : ", error);
    })
    

    // this.projectData = {
    //   "id" : this.projectId,
    //   "title": "Project "+this.projectId,
    //   "features": [
    //     { title:"feature1", accepted:true, cost: 125, start_date: new Date(), deadline: 3, status: "pending"},
    //     { title:"feature2", accepted:true, cost: 125, start_date: new Date(), deadline: 3, status: "done"},
    //     { title:"feature3", accepted:false, cost: 125, start_date: new Date(), deadline: 3},
    //     { title:"feature4", accepted:false, cost: 125, start_date: new Date(), deadline: 3},
    //   ],
    //   "comments": [
    //     { user: "Pushpit", description: "We should add this feature We should add this feature We should add this feature We should add this feature We should add this featureWe should add this feature We should add this feature We should add this feature" },
    //     { user: "Photon", description: "Bhai kyooo" },
    //     { user: "Divya", description: "Haa bhai nhi dalre" },
    //   ]
    // }
    
  }

  setProgress(){
    var doneFeaturesCount:any = 0;
    var acceptedFeaturesCount:any = 0;
    this.projectData.features.forEach((feat:any) => {
      if(feat.manager_acceptance && feat.client_acceptance) {
        acceptedFeaturesCount++;
        if(feat.status == "done") doneFeaturesCount++;
      }
      feat.showContent = false;
    });
    this.projectData.progress = (doneFeaturesCount / acceptedFeaturesCount)*100;
    // console.log(this.projectData.progress, "Progress");

    
  }

  openAddFeaturePopup(){
    let dialogRef = this.dialog.open(AddFeaturePopupComponent, {
      height: '35%',
      width: '500px',
      data: {data: this.projectData}
    });
  }

  onFeatureReject(feature:any){
    let body:any = {
      projectId: this.projectData["_id"],
      feature_title: feature.feature_title
    }
    this.userClientService.removeFeature(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Feature Rejected Successfully", "OK")
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error Occured", "OK")
    });
  }

  onFeatureAccept(feature:any){
    if(sessionStorage.getItem("type") == 'user'){
      this.openFeatureCostPopup(feature);
    }else if (sessionStorage.getItem("type") == 'client')
    //else if client
    this.acceptClientFeature(feature);
  }
  
  
  openFeatureCostPopup(feature:any){
    let dialogRef = this.dialog.open(FeatureCostPopupComponent, {
      height: '250px',
      width: '400px',
      data: {feature:feature, projectData: this.projectData}
    });
  }
  acceptClientFeature(feature:any){
    let body:any = {
      projectId : this.projectData["_id"],
      feature_title: feature.feature_title,
      user_type : 'client',
      status : true,
    }
    this.userClientService.updateFeatureStatus(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Feature Accepted Successfully", "OK")
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error Occured", "OK")
    });

  }
  
  onAddTaskPopup(feature:any){
    let dialogRef = this.dialog.open(AddTaskPopupComponent, {
      height: '75%',
      width: '50%',
      data: {feature_title:feature.feature_title, projectId : this.projectData["_id"]}
    });
  }
  

  onNavigateToTask(feature:any, task:any){
    this.router.navigate(["projects/", this.projectData["_id"], feature.feature_title, task.task_title])
  }

  postComment(){
    let body:any = {
      project_id: this.projectData["_id"],
      email: sessionStorage.getItem("email"),
			content: this.pcomment,
      user_type: ""
    }
    this.pcomment = "";
    this.userClientService.addCommentToProject(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        body.timestamp = new Date().toISOString();
        this.projectData.comments.push(body);
      }
    }, (error:any) => {
      console.log(error);
    });

  }


}
