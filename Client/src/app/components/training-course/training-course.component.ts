import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralService } from 'src/app/services/general.service';
import { TrainingService } from 'src/app/services/training.service';
import { UserClientService } from 'src/app/services/user-client.service';

@Component({
  selector: 'app-training-course',
  templateUrl: './training-course.component.html',
  styleUrls: ['./training-course.component.scss']
})
export class TrainingCourseComponent implements OnInit {

  trainingId:any;
  trainingData:any;
  userData:any;
  activeCourseTab = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private datePipe: DatePipe,
    private authService : AuthenticationService,
    private userClientService : UserClientService,
    private generalService : GeneralService,

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
    this.trainingId = this.activatedRoute.snapshot.paramMap.get('course_id');
    console.log(this.trainingId);
    
    // this.trainingData = this.trainingService.getParticularCurrUserTrainings(this.trainingId);
    this.getTrainingData();
    
    console.log("Incoming data : ", this.trainingData)
  }

  getTrainingData(){
    this.trainingService.getParticularTraining(this.trainingId).subscribe((response:any) => {
      if(response){
        this.trainingData = response[0];
        this.getUserData(sessionStorage.getItem("email"));
      }
    })
  }

  getUserData(email:any){
    this.userClientService.getUserData(email).subscribe((response:any) => {
      if(response){
        // console.log("User data: ", response);
        this.userData = response[0];
        let index = this.userData.trainings.findIndex((x:any) => x["training_id"] == this.trainingData["_id"]);
        this.trainingData.status = this.userData.trainings[index].status;
        this.trainingData.deadline = this.userData.trainings[index].deadline;
        console.log(this.trainingData);
        
      }
    }, (error:any)=>{
      console.log("Error : ", error);
    })
  }

  changeCourseTab(index:any){
    this.activeCourseTab = index;
    this.trainingData.urls[this.activeCourseTab - 1]
  }

  onCompleteCourse(){
    var body:any = {
      training_id : this.trainingData["_id"],
      user : sessionStorage.getItem("email"),
      status : "done"
    }

    this.trainingService.updateTrainingStatus(body).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Course Completed Successfully", "Ok");
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });
    
  }

}
