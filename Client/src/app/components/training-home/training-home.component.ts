import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GeneralService } from 'src/app/services/general.service';
import { TrainingService } from 'src/app/services/training.service';
import { UserClientService } from 'src/app/services/user-client.service';

@Component({
  selector: 'app-training-home',
  templateUrl: './training-home.component.html',
  styleUrls: ['./training-home.component.scss']
})
export class TrainingHomeComponent implements OnInit {

  sessionData:any;

  userData:any;
  trainingData:any = [];
  courseList:any;
  employeeList:any;

  today:any;
  todaysDate:any;
  currentTrainingTab:any = "in-progress";
  
  newTrainingForm:any;
  assignTrainingForm:any;

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private authService : AuthenticationService,
    private userClientService: UserClientService,
    private generalService: GeneralService,
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


    this.today = new Date();
    this.getTodaysDate();
    
    this.getTrainingDataForEmployee();

    this.resetNewTrainingData();
    // this.getCourseList();
    this.getEmployeeData();
    this.getAllTrainings();
  }

  // =========================================== GET PAGE DATA =========================================== 

  // Employee
  getTrainingDataForEmployee(){
    
    this.trainingService.getUserTrainings(sessionStorage.getItem("email")).subscribe((response:any) => {
      if(response){
        console.log("Training data : ", response);
        this.trainingData = response;
      }
    })
    
    // var tomorrow = new Date();
    // tomorrow.setDate(this.today.getDate()+10);
    // this.trainingData = [
    //   {id:1, assignee: "Manager 1", title:"Introduction to Cloud Computing", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", reward_points: 20, urls: ['https://youtu.be/yw04QD1LaB0', 'https://youtu.be/TdbQ2CX3jCQ'], assigned_date: this.today, deadline: tomorrow, completed: true},
    //   {id:2, assignee: "Super user", title:"Introduction to DBMS", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", reward_points: 30, urls: ['https://youtu.be/yw04QD1LaB0', 'https://youtu.be/TdbQ2CX3jCQ','https://youtu.be/yw04QD1LaB0'], assigned_date: this.today, deadline: tomorrow, completed: false},
    //   {id:3, assignee: "Manager 1", title:"Introduction to Cloud Computing", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", reward_points: 20, urls: ['https://youtu.be/yw04QD1LaB0', 'https://youtu.be/TdbQ2CX3jCQ', 'https://youtu.be/yw04QD1LaB0'], assigned_date: this.today, deadline: tomorrow, completed: true},
    //   {id:4, assignee: "Super user", title:"Introduction to DBMS", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", reward_points: 30, urls: ['https://youtu.be/yw04QD1LaB0', 'https://youtu.be/TdbQ2CX3jCQ'], assigned_date: this.today, deadline: tomorrow, completed: false},
    // ];    

  }

  // Manager / Super-User
  getCourseList(){
    
    this.courseList = [
        {id:1, title:"Introduction to Cloud Computing", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", reward_points: 20, urls: ['https://youtu.be/yw04QD1LaB0', 'https://youtu.be/TdbQ2CX3jCQ']},
        {id:2, title:"Introduction to Automata", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", reward_points: 35, urls: ['https://youtu.be/yw04QD1LaB0', 'https://youtu.be/TdbQ2CX3jCQ','https://youtu.be/yw04QD1LaB0']},
        {id:3, title:"Introduction to OS", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", reward_points: 25, urls: ['https://youtu.be/yw04QD1LaB0', 'https://youtu.be/TdbQ2CX3jCQ', 'https://youtu.be/yw04QD1LaB0']},
        {id:4, title:"Introduction to DBMS", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", reward_points: 30, urls: ['https://youtu.be/yw04QD1LaB0', 'https://youtu.be/TdbQ2CX3jCQ']},
    ]

  }

  getEmployeeData(){
    // GET all of the employee's data
    // this.employeeList = [
    //   {id: 1, name: "Pushpit"},
    //   {id: 2, name: "Photon"},
    //   {id: 3, name: "Divya"},
    //   {id: 4, name: "Yash"},
    //   {id: 5, name: "Pratham"},
    //   {id: 6, name: "Mansimar"},
    // ];

    this.userClientService.getAllUsers(sessionStorage.getItem("companyId")).subscribe((response:any) => {
      if(response){
        console.log("Emp list : " , response);
        this.employeeList = response;
        this.resetAssignTrainingData();
      }
    })


  }

  getAllTrainings(){
    this.trainingService.getAllTrainings(sessionStorage.getItem("companyId")).subscribe((response) => {
      if(response){
        console.log(response);
        this.courseList = response;
      }
    })
  }

  // =========================================== INTERACTIONS =========================================== 
  openTraining(training:any){
    this.router.navigate(["training/",training.training_id])
  }

  changeTrainingTab(tab:any){
    this.currentTrainingTab = tab;
  }


  getTodaysDate(){
    var now = new Date();
    now.setDate(now.getDate()+1)
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    this.todaysDate = now.toISOString().split(":").slice(0,2).join(":");
    console.log(this.todaysDate);
    
  }

  onCheckBoxChange(event:any){
    var checkbox:any = document.getElementById("select-all-emp") as HTMLInputElement;

    if(!event.target.checked) checkbox.checked = false;
    else{
      let index = this.assignTrainingForm.emp_id.findIndex((x:any) => x.assigned == false);
      if(index > -1) checkbox.checked = false;
      else checkbox.checked = true;
      console.log(index);
      console.log(this.assignTrainingForm.emp_id);
    }

  }
  onSelectAllCheckBox(event:any){
    var tmp_bool:any = false;
    if (event.target.checked) tmp_bool = true;
    else tmp_bool = false;
    this.assignTrainingForm.emp_id.forEach((emp:any) => {
      emp.assigned = tmp_bool;
    });
  }

  // =========================================== CREATE NEW TRAINING =========================================== 

  resetNewTrainingData(){
    this.newTrainingForm = {
      title : "",
      content: "",
      reward: 0,
      urls: [],
      company_id: sessionStorage.getItem("companyId")
    }
  }
  addNewTrainingUrl(){
    this.newTrainingForm.urls.push("")
  }
  removeNewTrainingUrl(i:any){
    this.newTrainingForm.urls.splice(i,1);
  }
  createTraining(){
    let tmpUrls:any = [];
    this.newTrainingForm.urls.forEach((url:any) => {
      let code:any = "";
      if(url.includes("watch")){
        let tmpUrl = new URL(url);
        let parameters = new URLSearchParams(tmpUrl.search);
        code = parameters.get("v");
      }else{
        let arr = url.split("/");
        code = arr[arr.length - 1];
      }
      tmpUrls.push("https://www.youtube.com/embed/" + code);
    });
    this.newTrainingForm.urls = tmpUrls;
    // console.log(this.newTrainingForm);

    this.trainingService.addTraining(this.newTrainingForm).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Training Created Successfully", "Ok");
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });


    this.resetNewTrainingData();
  }

  // =========================================== Assign TRAINING =========================================== 

  resetAssignTrainingData(){
    this.assignTrainingForm = {
      training_id : "",
      deadline : "",
      emp_id : []
    }
    this.employeeList.forEach((emp:any) => {
      this.assignTrainingForm.emp_id.push({id: emp["email"], assigned:false})
    });
    this.onCheckBoxChange({target: {checked: false}})
  }

  assignTraining(){
    let tmparr:any = [];
    this.assignTrainingForm.emp_id.forEach((el:any) => {
      if (el.assigned) tmparr.push(el.id);
    });
    this.assignTrainingForm.assignees = tmparr;
    // console.log(this.assignTrainingForm);

    this.trainingService.assignTraining(this.assignTrainingForm).subscribe((response:any) => {
      if(response) {
        console.log(response);
        this.generalService.openMessageSnackBar("Training Assigned Successfully", "Ok");
      }
    }, (error:any) => {
      console.log(error);
      this.generalService.openMessageSnackBar("Error", "Ok");
    });

    this.resetAssignTrainingData();

  }


}
